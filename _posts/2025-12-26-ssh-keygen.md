---
layout: post
title: SSH Key Generation with ssh-keygen
date: 2025-12-26 06:35:00
description: A comprehensive guide to generating and managing SSH keys using ssh-keygen
tags: ssh security git authentication
categories: tutorial
featured: true
---

SSH keys provide a secure way to authenticate with remote servers and services like GitHub, GitLab, and other Git hosting platforms. This guide will walk you through generating SSH keys using the `ssh-keygen` command.

## What is ssh-keygen?

`ssh-keygen` is a command-line tool used to generate, manage, and convert authentication keys for SSH (Secure Shell). It creates a pair of keys: a private key (kept secret on your machine) and a public key (shared with servers you want to access).

## Basic SSH Key Generation

The simplest way to generate an SSH key pair is:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

This command:

- `-t ed25519` specifies the type of key to create (Ed25519 is modern and secure)
- `-C "your_email@example.com"` adds a label to help identify the key

### Alternative Key Types

If your system doesn't support Ed25519, you can use RSA:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

- `-b 4096` sets the key size to 4096 bits for better security

## Interactive Process

When you run the command, you'll be prompted for:

1. **File location**: Press Enter to accept the default location (`~/.ssh/id_ed25519`)

   ```
   Enter file in which to save the key (/home/user/.ssh/id_ed25519):
   ```

2. **Passphrase**: Enter a secure passphrase (optional but recommended)
   ```
   Enter passphrase (empty for no passphrase):
   Enter same passphrase again:
   ```

## Generating Keys with Custom Names

To generate a key with a specific name:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github_key -C "github_account@example.com"
```

This creates:

- Private key: `~/.ssh/github_key`
- Public key: `~/.ssh/github_key.pub`

## Using SSH Keys with GitHub

After generating your key, add it to GitHub:

1. Copy your public key:

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. Go to GitHub Settings → SSH and GPG keys → New SSH key

3. Paste the public key and save

4. Test the connection:
   ```bash
   ssh -T git@github.com
   ```

## SSH Config for Multiple Keys

If you have multiple SSH keys for different services, create or edit `~/.ssh/config`:

```
# GitHub account
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_key

# GitLab account
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/gitlab_key

# Personal server
Host myserver
    HostName 192.168.1.100
    User username
    IdentityFile ~/.ssh/server_key
```

## Security Best Practices

1. **Always use a passphrase**: Protects your key if someone gains access to your computer

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com" -N "your-secure-passphrase"
   ```

2. **Set proper permissions**:

   ```bash
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/id_ed25519
   chmod 644 ~/.ssh/id_ed25519.pub
   ```

3. **Use ssh-agent** to avoid entering passphrase repeatedly:

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

4. **Never share your private key**: Only share the `.pub` (public) key file

## Viewing Key Fingerprint

To verify your key's fingerprint:

```bash
ssh-keygen -lf ~/.ssh/id_ed25519.pub
```

For a visual representation:

```bash
ssh-keygen -lvf ~/.ssh/id_ed25519.pub
```

## Changing Key Passphrase

To change the passphrase on an existing key:

```bash
ssh-keygen -p -f ~/.ssh/id_ed25519
```

## Common Key Locations

By default, ssh-keygen creates keys in `~/.ssh/`:

- `id_rsa` / `id_rsa.pub` - RSA key pair
- `id_ed25519` / `id_ed25519.pub` - Ed25519 key pair
- `id_ecdsa` / `id_ecdsa.pub` - ECDSA key pair
- `known_hosts` - List of known server fingerprints
- `authorized_keys` - Public keys allowed to access this machine
- `config` - SSH client configuration

## Troubleshooting

If you encounter issues:

1. **Permission denied**: Check file permissions and key format

   ```bash
   ls -la ~/.ssh/
   ```

2. **Agent has no identities**: Add your key to ssh-agent

   ```bash
   ssh-add -l  # List loaded keys
   ssh-add ~/.ssh/id_ed25519  # Add your key
   ```

3. **Bad permissions error**: Fix with:
   ```bash
   chmod 600 ~/.ssh/id_ed25519
   chmod 644 ~/.ssh/id_ed25519.pub
   ```

## Converting Between Formats

To convert OpenSSH format to PEM format (if needed for older systems):

```bash
ssh-keygen -p -m PEM -f ~/.ssh/id_rsa
```

## Conclusion

SSH keys are an essential tool for secure authentication. By following this guide, you can generate strong SSH keys and use them effectively with Git hosting platforms and remote servers. Remember to keep your private keys secure and use passphrases for an extra layer of protection.

## Quick Reference

```bash
# Generate Ed25519 key (recommended)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Generate RSA key (if Ed25519 not supported)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Generate key with custom name
ssh-keygen -t ed25519 -f ~/.ssh/custom_name -C "label"

# Copy public key to clipboard (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Copy public key to clipboard (Linux with xclip)
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# Copy public key to clipboard (Windows WSL)
clip.exe < ~/.ssh/id_ed25519.pub

# Test GitHub connection
ssh -T git@github.com

# Start ssh-agent and add key
eval "$(ssh-agent -s)" && ssh-add ~/.ssh/id_ed25519
```

---

For more detailed information, check the manual page:

```bash
man ssh-keygen
```
