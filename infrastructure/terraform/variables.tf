# realsoccer/infrastructure/terraform/variables.tf
# Variables for Real Soccer Terraform configuration.

variable "aws_region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "us-east-1" # Change to your preferred region
}

variable "ami_id" {
  description = "The AMI ID for the EC2 instance (e.g., Ubuntu 20.04 LTS HVM)"
  type        = string
  default     = "ami-0abcdef1234567890" # REPLACE WITH A VALID AMI ID FOR YOUR REGION
}

variable "instance_type" {
  description = "The EC2 instance type"
  type        = string
  default     = "t3.medium"
}

variable "key_pair_name" {
  description = "The name of the AWS EC2 Key Pair to use for SSH access"
  type        = string
  # Example: default = "my-ssh-key"
}

variable "vpc_id" {
  description = "The ID of the VPC to deploy resources into"
  type        = string
  # Example: default = "vpc-0abcdef1234567890"
}

variable "subnet_id" {
  description = "The ID of the subnet to deploy the EC2 instance into"
  type        = string
  # Example: default = "subnet-0abcdef1234567890"
}

variable "ssh_allowed_cidr" {
  description = "CIDR block for SSH access (e.g., your public IP /32)"
  type        = string
  # Example: default = "0.0.0.0/0" # WARNING: Be more specific in production
}

variable "environment" {
  description = "The deployment environment (e.g., dev, staging, prod)"
  type        = string
  default     = "development"
}

variable "server_port" {
  description = "The port the Node.js server listens on"
  type        = number
  default     = 5000
}

variable "mongo_port" {
  description = "The port MongoDB listens on"
  type        = number
  default     = 27017
}