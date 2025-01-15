[<img src="https://plextech.berkeley.edu/images/PlexTechLogo.png" width="100" alt="PlexTech Logo">](https://plextech-member-portal.vercel.app)

# [PlexTech Member Portal](https://plextech.berkeley.edu/members)

The PlexTech Member Portal is a web application designed to provide members of PlexTech with a hub for all of the necessary resources. PlexTech is a student organization at the University of California, Berkeley that provides software consulting services to various companies. If you're interested in these services, please contact [info@plextech.berkeley.edu](mailto:info@plextech.berkeley.edu).

This project was built with React.js, Flask, and MongoDB (TypeScript + Python). PlexTech provides a New Member Experience program that teaches new members how to utilize this tech stack to create beautiful, interactive websites like this one.

## Features

- Automatic requesting and processing of reimbursements through ACH transfers
- Attendance tracking by scanning QR codes that change every 10 seconds
- Public forum for discussions, including private and anonymous posts, upvotes, and comments.

In development:

- Technical interview platform
- Member resources repository

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/PlexTechIP/plextech-member-portal.git
```

2. Navigate to the project directory:

```bash
cd plextech-member-portal
```

3. Install dependencies (make sure you have Node.js and npm installed on your machine):

```bash
yarn install
```

4. Run the frontend:

```bash
yarn start
```

5. Navigate to the server directory

```bash
cd server
```

6. Install dependencies (make sure you have python installed on your machine):

```bash
pip install -r requirements.txt
```

7. Add the .env file to the server directory (this contains sensitive information)

8. Run the server:

```bash
python main.py
```

## Getting Started

This website is deployed on PlexTech's OCF servers. Since the server isn't able to run `yarn build`, you will need to:

1. Build the code locally using `yarn build`
2. Commit and push the build files
3. `ssh` into the server using `ssh plextech@apphost.ocf.berkeley.edu`. Ask an admin for the password.
4. Run `cd app/plexfinance`
5. Run `git pull`
6. Run `systemctl --user restart app`

The local build step is taken care of by a pre-commit hook that only runs if you change any frontend code - see `.husky/pre-commit`.

## License

Distributed under the MIT License. See `LICENSE` for more information.
