#!/bin/bash

echo "🚀 Healthbrd Frontend Setup Script"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Navigate to frontend directory
cd crisp-ui-toolkit

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

echo ""
echo "🎉 Frontend setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure your backend is running on port 4000"
echo "2. Start the frontend development server:"
echo "   npm run dev"
echo ""
echo "3. The frontend will be available at: http://localhost:5173"
echo ""
echo "4. Test credentials:"
echo "   Marketing: marketing@healthbrd.com / password123"
echo "   Medical: medical@healthbrd.com / password123"
echo ""
echo "🔗 Backend Integration:"
echo "   Frontend is now connected to backend API at: http://localhost:4000/api"
echo ""
echo "Happy coding! 🚀"


