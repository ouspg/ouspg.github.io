---
title: "Arch Linux virtual machine"
headless: false
author: Oulu University Secure Programing Group
# layout: learning
date: 2023-03-19
showDateUpdated: true
showDate: false
showAuthor: false
showEdit: true
editAppendPath: true
showPagination: true 
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
coverCaption: "Arch Linux is registered trademark of the Arch Linux project" 
---

# Arch Linux with Black Arch repositories

Lightweight and customised Arch Linux-based virtual machine can be used in many courses.
This Linux distribution might have a different package manager than many have used, but it has *an excellent wiki* for possible problem situations and is a good guide.
See [Arch Linux Wiki.](https://wiki.archlinux.org/)

The virtual machine has only a minimal amount of tools pre-installed in case you don't have enough space on a hard drive.
The package ecosystem is large, and the desired pre-build package will be most likely to be found if you are willing to install tools by yourself.
It will also offer the latest available versions of the tools all the time.

Look for packges from
  * [Arch Linux main packages](https://archlinux.org/packages/)
  * [AUR packages(user supplied)](https://aur.archlinux.org/packages)
  * [Black Arch tools (penetration testing)](https://blackarch.org/tools.html)

All of the repositories are pre-configured.

## Image information

The image uses Gnome Desktop Environment as default and includes some core packages, e.g. browser, the code editor and some programming languages.

* Username: **arch**
* Password: **arch**

### x86_64 Linux, Intel Macbooks, and Windows systems

Image is distributed in [OVA](https://en.wikipedia.org/wiki/Open_Virtualization_Format) format for x86_64 architectures.
This image is intended for VirtualBox or VMware.

VirtualBox guest additions are included.
For VMware, `open-vm-tools` are included.

OVA files can be directly imported into VirtualBox or VMware.
You must configure basics, e.g. RAM and CPU core amount.
At least 4GB ram and 2 cores are recommended.

If you face a freezing screen on the start-up in VirtualBox, change the display driver to another one.

### M1/M2 Macbooks

For ARM-based M1/M2 Macbooks, it is distributed in `qcow2` format.
The ARM image uses Arch Linux ARM (unofficial) as a base, and package availability might differ for `x86_64` version.

Use [UTM](https://mac.getutm.app/).

Download the `qcow2` image and extract it.
You need to create a dummy virtual machine at first (not emulation!), and then replace the empty virtual hard drive with the downloaded one.

The image is _UEFI_ bootable.


## Black Arch repositories

You can directly install [Black Arch](https://blackarch.org/) tools if you need some special ones, from the collection of 2800+ tools.

Only a few are preinstalled to save disk space.

See their [tools](https://blackarch.org/tools.html) section for available tools.


## Installing packages

Update the package index

```console
sudo pacman -Sy
```
    
Install package (You can look from here https://archlinux.org/packages/ for official packages and https://blackarch.org/tools.html for penetration testing tools.)

```console
sudo pacman -S <package-name>
```

Remove package 
```console
sudo pacman -R <package-name>
```

Remove package and its dependencies 
```console
sudo pacman -Rcns <package-name>
```


Upgrade all packages
```console
sudo pacman -Syu
```

Clean all the packages which have no dependencies (however, might remove something you need as well!)

```console
sudo pacman -Qdtq
```

Clean package cache:
```console
sudo pacman -Sc
```

Clean allk


## Installing AUR packages (from https://aur.archlinux.org/packages/)

Arch Linux has a large user-supplied package ecosystem, which is located in a different repository.
See https://aur.archlinux.org/packages/.
Usually, you need some kind of helper for installing these packages. 

[`yay`](https://github.com/Jguer/yay) helper has been pre-installed for installing AUR packages.

Install AUR package (Note, that `sudo` is not included in the initial command, when compared to `pacman`)

```console
yay -S <aur-package-name>
```
Remove AUR package

```console
yay -R <aur-package-name>
```

Upgrade all packages
```console
yay
```
