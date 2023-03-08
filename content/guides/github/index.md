---
title: "GitHub Classroom Instructions"
headless: false
author: Oulu University Secure Programing Group
# layout: learning
date: 2023-02-22
lastmod : [':git', ':fileModTime']
showDateUpdated: true
showDate: false
showAuthor: false
showEdit: true
showPagination: true 
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
coverCaption: "If that doesn't fix it, git.txt contains the phone number of a friend of mine who understands git. Just wait through a few minutes of 'It's really pretty simple, just think of branches as...' and eventually you'll learn the commands that will fix everything. Source: [xkcd](https://xkcd.com/1597/) " 
---

Some courses use GitHub Classroom as a place where assignments will be returned.
In practice, students will have a single regular Git repository, which will be updated during the course.
Often, there will be template files, which will be filled as instructed.

## Workflow

  1. Enrol in the course

  2. Find the course's Moodle page from University's Moodle (https://moodle.oulu.fi/)

  3. Find a link where you can receive and create a private repository containing all the return template folders. You are expected to answer for given templates and store your actual work in this repository.

  4. Create a GitHub account, if you don't have one already, and create this private repository from the link.

  5. You can see the deadlines in Moodle's return boxes. Modifications in the repositories are not restricted, but do them in time. 

  6. Complete as many tasks as you wish and update your repository accordingly. Check the grading table found in each week's instructions on what you have to complete to earn the grade of your choosing

  6. Push your changes to your repository before the deadline, and return the link to your repository to the corresponding return box of the exercise week in Moodle.

Check [the cheat sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf) if you need a refresher on how to use Git.
The simple workflow to add files, mark changes and push them to remote from the command line is:
```sh
git add </path/filename>
git commit -m "<message>"
git push
```

You can also use the graphical interface of GitHub, but this might not be as convenient as it seems.
We recommend instead installing [Git](https://git-scm.com/) for your machine, and modifying Markdown files either by using [VSCode](https://code.visualstudio.com/) or the fully open-source version [VSCodium](https://vscodium.com/).

## Authentication

When using GitHub from the command line, some level of authentication is required.
If you are using two-factor authentication (2FA, you should!), basic username and password authentication will not work.
Instead, you either need to use SSH or [PAT tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

We recommend that you use SSH keys. 
Follow GitHub's tutorial over [here.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)
Especially check sections "Generating new SSH key", "Add a new SSH key" and "Test your SSH connection".
