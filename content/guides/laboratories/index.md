---
title: "Laboratory environment and virtual machines"
headless: false
author: Oulu University Secure Programing Group
# layout: learning
date: 2023-02-22
lastmod: 2023-02-22
showDateUpdated: true
showDate: false
showAuthor: false
showEdit: false
showPagination: true 
showTableOfContents: true
showReadingTime: false
showBreadcrumbs: false
showTableOfContents: true
---

Laboratory assignments utilize a set of various tools and also handle potentially malicious files in Lab 3. Thus it is recommended to handle files in an isolated environment, or at least the execution of tools happens in an isolated environment at some level.

A straightforward solution for this is pre-configured virtual machines - if you have enough disk space and performance on your computer to use them. For Windows users - this is the most convenient way.

If you are already using Linux/macOS-based operating system, the other option is to use a specific tool called cincan-command. It is a wrapper for Docker to run a different kinds of tools in isolated matter. It makes the installation of a wide variety of tools easier while providing some level of isolation as well. Most of the tools used in exercises are usable with it. It requires that Python 3.6+ and Docker are functioning in your system. Installation steps can be found from the documentation.

If you want, you can install packages in a normal way, or just use the provided virtual machine on the Linux host as well.