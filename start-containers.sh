#!/bin/bash

echo "🚀 Starting Howdens Project with Redis..."

# Stop any existing containers
echo "Stopping existing containers..."
docker compose down

# Build and start all services
echo "Building and starting services..."
docker compose up --build -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 10

# Check service status
echo "Checking service status..."
docker compose ps

echo ""
echo "✅ Services are running:"
echo "📊 Redis: localhost:6379"
echo "🔧 Backend API: http://localhost:5000"
echo "🌐 Frontend: http://localhost:3000"
echo "❤️  Health Check: http://localhost:5000/health"

echo ""
echo "📝 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Redis CLI: docker-compose exec redis redis-cli"
echo "  Backend shell: docker-compose exec backend /bin/bash"