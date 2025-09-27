@echo off
echo Building admin dashboard for production...
call npm run build

echo Build completed successfully!
echo.
echo To deploy to Render:
echo 1. Go to your Render dashboard
echo 2. Find your admin dashboard static site
echo 3. Click "Manual Deploy" if auto-deploy is not enabled
echo.
echo Or push to GitHub to trigger auto-deployment:
echo git add .
echo git commit -m "Update admin dashboard"
echo git push

pause
