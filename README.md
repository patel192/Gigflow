                                     GigFlow – Full Stack Freelance Marketplace

A modern full-stack freelance marketplace where clients post projects and freelancers bid to get hired.  
Built with production-level authentication, protected APIs, role behavior, and a responsive UI.

> This project was developed as a Full Stack Developer assignment and demonstrates real-world architecture, security, and deployment practices.

//---------------------------------------------//

## Live Links

Frontend (Vercel):  
https://gigflow-frontend-gamma.vercel.app

Backend (Render API):  
https://gigflow-backend-wj2p.onrender.com

//---------------------------------------------//

## What This Project Demonstrates

This is not a CRUD demo. This project demonstrates:

- Real authentication flow using **HTTP-only cookies**
- Protected APIs with middleware
- Role-based behavior (Client vs Freelancer)
- End-to-end feature flow (Post → Bid → Hire → Assigned)
- Production deployment issues (CORS, cookies, redirects, env handling)
- Clean UI/UX and responsive design
- API + Frontend integration
- Debugging real production issues

This is how real-world applications are built.

//------------------------------------------------------//

## Core Features

### Authentication & Security
- Register & Login
- JWT stored in **HTTP-only cookies**
- Protected routes using middleware
- Auto logout behavior
- Secure API calls using `withCredentials`

### Client Capabilities
- Create gig
- Edit gig
- Delete gig
- View all bids on own gigs
- Hire freelancer
- Automatically closes gig after hiring
- View hired freelancer details

### Freelancer Capabilities
- Browse gigs
- Search gigs by title
- View gig details
- Place bids
- View own bids
- See bid status (pending / hired / rejected)

### UI & Experience
- Fully responsive (mobile + desktop)
- Modern black/yellow theme
- Tailwind UI styling
- Lucide icons
- Framer Motion animations
- Toast notifications for feedback
- Professional dashboard layout

//----------------------------//

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- React Hot Toast
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie-based auth
- RESTful APIs

### Deployment
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

//------------------------------------//

## Architecture Overview

                                                 Client (React)
                                                     |
                                                     | Axios (withCredentials)
                                                     ↓ 
                                                 Express API
                                                     |
                                                     | Middleware (protect)
                                                     ↓ 
                                          MongoDB (Users, Gigs, Bids)

//------------------------------//
Authentication flow:
-------> Login/Register sets secure cookie

-------> Cookie automatically sent with every request

-------> Backend validates JWT using middleware

-------> No token stored in localStorage (secure practice)

//--------------------------------//

## Folder Structure

/client -----→ React frontend (Vite)
/server -----→ Express backend
README.md -----→ Project documentation


---

## Environment Variables

### Backend (.env)

MONGO_URI=mongodb+srv://muhammadpatel:Muhammad161003@gigflow.8dlntcr.mongodb.net/?appName=Gigflow
JWT_SECRET=supersecurejwtsecretkey
PORT=5000


//------------------------//

## Running Locally

### Backend
```bash
cd server
npm install
npm run dev



### Frontend
cd client
npm install
npm run dev



Author

Muhammad Patel
Full Stack Developer
GitHub: https://github.com/patel192
