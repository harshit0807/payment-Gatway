
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") }); 
const connectDB = require("./db");
const express = require('express');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes.js');




const app = express();



// 
app.use(cors({
  // origin: "http://localhost:8080",
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
connectDB();
// Routes
app.use('/api/admin', adminRoutes); 

// app.use('/api/admin', dashboardRoutes);
// app.use('/api/admin', jobRoutes);
// app.use('/api/admin', companyRoutes);
// app.use('/api/admin', contactusRoutes);
// app.use('/api/admin', updatestatusRoutes);
// app.use('/api/admin', skillsRoutes);
// app.use('/api/admin', addskillRoutes);
// app.use('/api/admin', updateSkillRoutes);
// app.use('/api/admin', supportRoutes);
// app.use("/api/admin", supportStatusRoutes);
// app.use('/api/admin', teamRoutes);
// app.use('/api/admin', varifyRoutes);
// app.use("/api/admin", companyDetailsRoutes);
// app.use("/api/admin", candidateRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
