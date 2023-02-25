---
title: "Laboratory environment and virtual machines"
headless: false
author: Oulu University Secure Programing Group
# layout: learning
date: 2023-02-21
lastmod : [':git', ':fileModTime']
showDateUpdated: true
showDate: false
showAuthor: false
showEdit: true
showPagination: true 
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showTableOfContents: true
coverCaption: 'One of the survivors, poking around in the ruins with the point of a spear, uncovers a singed photo of Richard Stallman. They stare in silence. "This," one of them finally says, "This is a man who BELIEVED in something. Source: [xkcd](https://xkcd.com/1508/)'
coverAlt: "Operating systems by xkcd"

---

Laboratory assignments utilise a set of various tools which might require or target different operating systems.
In most cases, the required system will be Linux-based, and if you don't have one already, some steps are required.

**We provide** up-to-date and suitable virtual machines for the courses with all the required tools installed.
If you have enough disk space and performance on your computer to use them, this might be the most convenient way for Windows users.

If you are a brave soul, you can install tools [by yourself](#installing-the-tools-by-yourself).

## Provided virtual machines

Global download links for pre-configured virtual machines can be found on the corresponding courses' Moodle page.
These virtual machines are also located on the University network drive and can be accessed either locally [from the classroom](#classroom-specific-instructions) or with [VPN](#getting-virtual-machines-with-vpn).

| Operating system | Description | Courses | Credentials |
|---|---|---|---|
| Kali Linux | Official Kali with extra packages | Computer Security | kali:kali |
| ChipWhisperer (Jupyter) | Use ChipWhisperer on Jupyter Notebook | Computer Security | vagrant:vagrant |
| Ubuntu 22.04 LTS | Ubuntu with only required tools | Cryptographic Systems and Weaknesses | crypto:crypto |
| Arch Linux (with Black Arch repos) | Minimal distribution, [good documentation](https://wiki.archlinux.org/title/Arch_Linux), any tool can be easily installed | Any | arch:arch |



## Classroom-specific instructions 

These instructions apply to (TS135/TS137) or any computer with VMware or Virtualbox hypervisor installed.
You must be on the University premises and can access to laboratory computer which has a hypervisor installed.

### Accessing the network drive

Mount network drive **by using PowerShell** (If the domain 'kaappi' is not found, you can use "\\cifs.isi.oulu.fi\Virtuaalikoneet$")

```powershell
New-PSDrive -Persist -Name "Z" -PSProvider "FileSystem" -Root "\\kaappi\Virtuaalikoneet$"
```

You should be able to find the new `Z:` drive named as Virtuaalikoneet$ by using File Explorer.
In the `Z:\VMware`, you will find virtual machines from the CyberSpecialisation folder.

### Running the machines

You can mount the network drive as above.
Copy the selected virtual machine to `C:\Temp` folder.
When the virtual machine asks if you have copied or moved the machine, press "I copied it".

## Getting virtual machines over Eduroam (University WLAN)

You can mount the network drive into your PC if it has been connected to [Eduroam](https://ict.oulu.fi/16970/?page&lang=en).

After you have successfully connected to the network, you can mount the network drive as follows. If any credentials are asked, the username is username@student.oulu.fi

### Windows

Open Windows cmd:

```cmd
net use z: "\\kaappi\Virtuaalikoneet$"
```

The drive should be mounted after giving correct credentials.
If the domain kaappi is not found, try to use the following instead:

```cmd
net use z: "\\cifs.isi.oulu.fi\Virtuaalikoneet$" 
```

### Linux (Debian - based)
If you have `mnt` folder in the `root` directory, and package *cifs-utils* is installed, you can:

```shell
sudo mount -t cifs //kaappi/Virtuaalikoneet$ /mnt/ -o user=username@student.oulu.fi
```
Depending on your version, you might need to play with 'sec' -variable, for example, Ubuntu 16.04 might require:
```shell
sudo mount -t cifs //kaappi/Virtuaalikoneet$ /mnt/ -o user=username@student.oulu.fi,sec=ntlm
```
Passwords should be prompted.

Virtual machines are located in the `Virtuaalikoneet$` drive.



## Getting virtual machines with VPN

If direct download URLs are not functioning for any reason and if you are not able to get into University to copy virtual machines from a network drive by using the lab computer, you can do it remotely as well.
This requires setting up *VPN - connection* to the University network.
This can be acquired by following the guidelines presented [here.](https://www.oulu.fi/en/for-students/supporting-your-studies-and-contact-information-students/it-services-students/remote-desktops) OpenVPN software is being used.

After you have successfully connected to the network, instructions are the same as [here.](#getting-virtual-machines-over-eduroam-university-wlan)

## Installing the tools by yourself

This might not be always the most convenient way, but *it will be the most educational*.
What you need to install, will vary based on the course and exercise, but general principles remain the same.

### Linux

If you are already using a Linux-based system, you can install the required packages most likely by using a system- or programming language-specific package manager, or by compiling from the source.

You can also use virtual machines with VirtualBox, for example, or container runner instead.
We recommend [Podman](https://podman.io/) as container runner.

### MacOS

If you are using macOS, you can install many packages by using [Homebrew](https://brew.sh/) or [Nix](https://nixos.org/) or running them as containers with Docker or Podman.

With an ARM-based Mac, you might have some difficulties with some tools, which you cannot compile yourself.
Virtualisation will be rather slow but might improve in the future.

### Windows

Only some of the tools will be directly available on Windows, but you can alternatively use [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/) instead of the full-blown virtual machine, and install in there like in regular Linux.

### Other

Good luck.

