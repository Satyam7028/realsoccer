# realsoccer/infrastructure/terraform/providers.tf
# Terraform providers configuration.

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0" # Use a compatible version
    }
  }
}

provider "aws" {
  region = var.aws_region
  # You can configure authentication methods here (e.g., shared credentials file, environment variables)
  # For example:
  # shared_credentials_file = "~/.aws/credentials"
  # profile                 = "default"
}