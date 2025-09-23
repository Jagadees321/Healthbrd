const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './config.env' });

// Import models
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const HCP = require('../models/HCP');
const PatientEngagement = require('../models/PatientEngagement');
const MedicalContent = require('../models/MedicalContent');
const AuditLog = require('../models/AuditLog');
const DashboardMetrics = require('../models/DashboardMetrics');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthbrd', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await HCP.deleteMany({});
    await PatientEngagement.deleteMany({});
    await MedicalContent.deleteMany({});
    await AuditLog.deleteMany({});
    await DashboardMetrics.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const marketingUser = new User({
      email: 'marketing@healthbrd.com',
      password: 'password123',
      role: 'marketing',
      firstName: 'Marketing',
      lastName: 'Manager'
    });

    const medicalUser = new User({
      email: 'medical@healthbrd.com',
      password: 'password123',
      role: 'medical',
      firstName: 'Medical',
      lastName: 'Director'
    });

    await marketingUser.save();
    await medicalUser.save();
    console.log('Created users');

    // Create campaigns
    const campaigns = [
      {
        name: "DiabCare2025",
        therapy: "diabetes",
        city: "Mumbai",
        reach: 2000,
        shares: 120,
        completions: { count: 420, rate: 70 },
        status: "Active",
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        contentPack: "video-en",
        createdBy: marketingUser._id
      },
      {
        name: "FootCareHindi",
        therapy: "diabetes",
        city: "Delhi",
        reach: 1500,
        shares: 90,
        completions: { count: 300, rate: 66 },
        status: "Active",
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-12-31'),
        contentPack: "video-hi",
        createdBy: marketingUser._id
      },
      {
        name: "HeartCare2025",
        therapy: "cardiac",
        city: "Bangalore",
        reach: 1800,
        shares: 105,
        completions: { count: 540, rate: 75 },
        status: "Paused",
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-12-31'),
        contentPack: "pdf-en",
        createdBy: marketingUser._id
      },
      {
        name: "Diabetes Awareness Q4",
        therapy: "diabetes",
        city: "Mumbai",
        reach: 500,
        shares: 45,
        completions: { count: 375, rate: 75 },
        status: "Active",
        startDate: new Date('2024-10-01'),
        endDate: new Date('2024-12-31'),
        contentPack: "video-en",
        createdBy: marketingUser._id
      },
      {
        name: "Hypertension Prevention",
        therapy: "hypertension",
        city: "Delhi",
        reach: 200,
        shares: 25,
        completions: { count: 50, rate: 25 },
        status: "Draft",
        startDate: new Date('2024-12-01'),
        endDate: new Date('2025-03-31'),
        contentPack: "pdf-hi",
        createdBy: marketingUser._id
      }
    ];

    for (const campaignData of campaigns) {
      const campaign = new Campaign(campaignData);
      await campaign.save();
    }
    console.log('Created campaigns');

    // Create HCPs
    const hcps = [
      {
        name: "Dr. Sharma",
        specialty: "Endocrinologist",
        city: "Mumbai",
        email: "dr.sharma@example.com",
        phone: "+91-9876543210",
        shares: 45,
        engagementScore: 9.2,
        totalEngagement: { views: 120, shares: 45, completions: 38 }
      },
      {
        name: "Dr. Patel",
        specialty: "Cardiologist",
        city: "Delhi",
        email: "dr.patel@example.com",
        phone: "+91-9876543211",
        shares: 38,
        engagementScore: 8.9,
        totalEngagement: { views: 95, shares: 38, completions: 32 }
      },
      {
        name: "Dr. Kumar",
        specialty: "General Physician",
        city: "Bangalore",
        email: "dr.kumar@example.com",
        phone: "+91-9876543212",
        shares: 34,
        engagementScore: 8.7,
        totalEngagement: { views: 85, shares: 34, completions: 28 }
      },
      {
        name: "Dr. Singh",
        specialty: "Diabetologist",
        city: "Chennai",
        email: "dr.singh@example.com",
        phone: "+91-9876543213",
        shares: 31,
        engagementScore: 8.5,
        totalEngagement: { views: 78, shares: 31, completions: 25 }
      },
      {
        name: "Dr. Gupta",
        specialty: "Internal Medicine",
        city: "Pune",
        email: "dr.gupta@example.com",
        phone: "+91-9876543214",
        shares: 28,
        engagementScore: 8.3,
        totalEngagement: { views: 70, shares: 28, completions: 22 }
      },
      {
        name: "Dr. Reddy",
        specialty: "General Physician",
        city: "Hyderabad",
        email: "dr.reddy@example.com",
        phone: "+91-9876543215",
        shares: 3,
        engagementScore: 4.2,
        totalEngagement: { views: 8, shares: 3, completions: 2 }
      },
      {
        name: "Dr. Verma",
        specialty: "Endocrinologist",
        city: "Kolkata",
        email: "dr.verma@example.com",
        phone: "+91-9876543216",
        shares: 2,
        engagementScore: 3.8,
        totalEngagement: { views: 5, shares: 2, completions: 1 }
      },
      {
        name: "Dr. Joshi",
        specialty: "Cardiologist",
        city: "Ahmedabad",
        email: "dr.joshi@example.com",
        phone: "+91-9876543217",
        shares: 1,
        engagementScore: 3.5,
        totalEngagement: { views: 3, shares: 1, completions: 0 }
      }
    ];

    for (const hcpData of hcps) {
      const hcp = new HCP(hcpData);
      await hcp.save();
    }
    console.log('Created HCPs');

    // Create patient engagement data
    const patientEngagements = [
      {
        week: "Week 1",
        completions: 80,
        change: 0,
        city: "Mumbai",
        language: "mixed",
        engagement: 78,
        asset: { name: "Diabetes Care Video (Hindi)", type: "video", language: "hindi" },
        dwellTime: "4.2 min",
        effectiveness: "High"
      },
      {
        week: "Week 2",
        completions: 124,
        change: 55,
        city: "Delhi",
        language: "hindi",
        engagement: 72,
        asset: { name: "Foot Care Guide (English)", type: "pdf", language: "english" },
        dwellTime: "3.8 min",
        effectiveness: "High"
      },
      {
        week: "Week 3",
        completions: 135,
        change: 9,
        city: "Bangalore",
        language: "english",
        engagement: 81,
        asset: { name: "Diet Chart PDF (Hindi)", type: "pdf", language: "hindi" },
        dwellTime: "2.1 min",
        effectiveness: "Medium"
      },
      {
        week: "Week 4",
        completions: 152,
        change: 13,
        city: "Chennai",
        language: "english",
        engagement: 69,
        asset: { name: "Exercise Video (English)", type: "video", language: "english" },
        dwellTime: "1.9 min",
        effectiveness: "Low"
      }
    ];

    for (const engagementData of patientEngagements) {
      const engagement = new PatientEngagement(engagementData);
      await engagement.save();
    }
    console.log('Created patient engagement data');

    // Create medical content
    const medicalContents = [
      {
        medicalName: "diabetes-care",
        description: "Comprehensive diabetes care video content",
        language: "english",
        expiryDate: new Date('2024-06-15'),
        reminderFrequency: "30d",
        status: "Pending",
        onLabel: true,
        notes: "Needs minor revisions",
        createdBy: medicalUser._id
      },
      {
        medicalName: "foot-care",
        description: "Foot care guidelines PDF in Hindi",
        language: "hindi",
        expiryDate: new Date('2024-08-20'),
        reminderFrequency: "15d",
        status: "Approved",
        approver: medicalUser._id,
        approvalDate: new Date('2024-01-15'),
        onLabel: true,
        notes: "Excellent content",
        createdBy: medicalUser._id
      }
    ];

    for (const contentData of medicalContents) {
      const content = new MedicalContent(contentData);
      await content.save();
    }
    console.log('Created medical content');

    // Create audit logs
    const auditLogs = [
      {
        contentId: "DC-001",
        approver: medicalUser._id,
        action: "Approved",
        status: "Active",
        notes: "Content meets guidelines"
      },
      {
        contentId: "FC-002",
        approver: medicalUser._id,
        action: "Rejected",
        status: "Rejected",
        notes: "Needs medical accuracy review"
      }
    ];

    for (const logData of auditLogs) {
      const log = new AuditLog(logData);
      await log.save();
    }
    console.log('Created audit logs');

    // Create dashboard metrics
    const dashboardMetrics = new DashboardMetrics({
      activeCampaigns: 8,
      totalReach: 2000,
      doctorShares: 120,
      completionRate: 70,
      roiImprovement: 15,
      patientEngagement: 22,
      hcpSatisfaction: 4.2,
      hcpEngagement: 89,
      patientReach: 2400,
      territoryCoverage: 85,
      weeklyActiveUsers: 156,
      monthlyActiveUsers: 421,
      totalHCPsOnboarded: 600,
      avgEngagementScore: 7.8
    });

    await dashboardMetrics.save();
    console.log('Created dashboard metrics');

    console.log('Database seeding completed successfully!');
    console.log('\nTest credentials:');
    console.log('Marketing User: marketing@healthbrd.com / password123');
    console.log('Medical User: medical@healthbrd.com / password123');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
