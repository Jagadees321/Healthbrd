#!/bin/bash

echo "🚀 Healthbrd Backend Setup Script"
echo "================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed. Please install MongoDB first."
    echo "   Visit: https://docs.mongodb.com/manual/installation/"
    exit 1
fi

echo "✅ Node.js and MongoDB are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
mongosh --eval "db.runCommand('ping')" --quiet

if [ $? -ne 0 ]; then
    echo "⚠️  MongoDB is not running. Please start MongoDB:"
    echo "   sudo systemctl start mongod"
    echo "   or"
    echo "   brew services start mongodb/brew/mongodb-community"
    echo ""
    echo "   Then run this script again."
    exit 1
fi

echo "✅ MongoDB is running"

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✅ Database seeded successfully"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend server:"
echo "   npm run dev"
echo ""
echo "2. The API will be available at: http://localhost:4000"
echo ""
echo "3. Test credentials:"
echo "   Marketing: marketing@healthbrd.com / password123"
echo "   Medical: medical@healthbrd.com / password123"
echo ""
echo "4. API Documentation: Check README.md for endpoint details"
echo ""
echo "🔗 Frontend Integration:"
echo "   Update your frontend API calls to point to: http://localhost:4000/api"
echo ""
echo "Happy coding! 🚀"
