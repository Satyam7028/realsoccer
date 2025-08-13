# realsoccer/infrastructure/terraform/main.tf
# Main Terraform configuration for Real Soccer infrastructure.
# This is a basic example for an AWS EC2 instance and Security Group.
# For a full production setup, you would typically provision:
# - VPC, Subnets, Internet Gateway, Route Tables
# - EKS Cluster (for Kubernetes) or EC2 instances
# - RDS for managed database (instead of self-hosted MongoDB)
# - Load Balancers (ALB/NLB)
# - DNS records (Route 53)
# - S3 for static assets/backups

resource "aws_security_group" "realsoccer_sg" {
  name        = "realsoccer-sg"
  description = "Allow HTTP, HTTPS, SSH, and custom ports for Real Soccer"
  vpc_id      = var.vpc_id # Replace with your VPC ID or create a new VPC

  # Inbound rules
  ingress {
    description = "Allow HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow SSH from specific IP (replace with your IP)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_allowed_cidr] # Your public IP /32
  }

  ingress {
    description = "Allow Node.js server port (e.g., 5000) from within VPC or specific IPs"
    from_port   = var.server_port
    to_port     = var.server_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Be more restrictive in production
  }

  ingress {
    description = "Allow MongoDB port (e.g., 27017) from within VPC or specific IPs"
    from_port   = var.mongo_port
    to_port     = var.mongo_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Be more restrictive in production
  }

  # Outbound rules
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "realsoccer-sg"
  }
}

resource "aws_instance" "realsoccer_app_server" {
  ami           = var.ami_id # e.g., ami-0abcdef1234567890 (Ubuntu 20.04 LTS HVM)
  instance_type = var.instance_type # e.g., t3.medium
  key_name      = var.key_pair_name # Your SSH key pair name
  vpc_security_group_ids = [aws_security_group.realsoccer_sg.id]
  subnet_id     = var.subnet_id # Replace with your subnet ID

  tags = {
    Name = "realsoccer-app-server"
    Environment = var.environment
  }

  # User data to install Docker and Docker Compose on instance launch
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
              sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              sudo apt-get update -y
              sudo apt-get install -y docker-ce docker-ce-cli containerd.io
              sudo usermod -aG docker ubuntu # Add ubuntu user to docker group
              sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              echo "Docker and Docker Compose installed."
              # You would then typically clone your repo and run docker-compose up here
              EOF
}

output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.realsoccer_app_server.public_ip
}

output "instance_public_dns" {
  description = "The public DNS name of the EC2 instance"
  value       = aws_instance.realsoccer_app_server.public_dns
}