# Eric-Devops-project

To run the CI/CD pipeline and the application using Amazon EC2 instance, Nginx server, npm, and PM2, follow these step-by-step instructions:

### CI/CD Pipeline Setup:

1. **GitHub Repository Setup:**
   - Make sure your Node.js application code is hosted in a GitHub repository.

2. **Docker Hub Setup:**
   - Create a Docker Hub account if you haven't already.
   - Create a new repository named `eric-robotics-repo1` or use an existing one.

3. **GitHub Secrets Setup:**
   - In your GitHub repository, go to Settings > Secrets.
   - Add two secrets:
     - `DOCKER_HUB_USERNAME`: Your Docker Hub username.
     - `DOCKER_HUB_ACCESS_TOKEN`: Your Docker Hub access token.

4. **Workflow File (`ci-cd.yml`):**
   - Create a `.github/workflows/ci-cd.yml` file in your repository with the following content:

```yaml
name: Node.js CI/CD

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Log into Docker Hub
      run: echo "${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}" | docker login -u "${{ secrets.DOCKER_HUB_USERNAME }}" --password-stdin
      
    - name: Build Docker image
      run: docker build -f Docker_Config.Dockerfile . -t moula1635/eric-robotics-repo1:v1

    - name: Push Docker image to Docker Hub
      run: docker push moula1635/eric-robotics-repo1:v1
```

### Application Setup:

1. **Amazon EC2 Instance:**
   - Launch an Amazon EC2 instance with Ubuntu OS.

2. **Nginx Setup:**
   - Install Nginx on your EC2 instance:
     ```bash
     sudo apt update
     sudo apt install nginx
     ```
   - Configure Nginx to serve your Node.js application by creating a new server block configuration file:
     ```bash
     sudo nano /etc/nginx/sites-available/my-app
     ```
     Add the following configuration (replace `<your_domain>` with your actual domain name or public IP address):
     ```
     server {
         listen 80;
         server_name <your_domain>;

         location / {
             proxy_pass http://localhost:3000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     ```
   - Create a symbolic link to enable the server block configuration:
     ```bash
     sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/
     ```
   - Test Nginx configuration and restart Nginx:
     ```bash
     sudo nginx -t
     sudo systemctl restart nginx
     ```

3. **Node.js Application Setup:**
   - SSH into your EC2 instance.
   - Clone your Node.js application repository:
     ```bash
     git clone <your_repository_url>
     ```
   - Navigate to your application directory and install dependencies:
     ```bash
     cd <your_application_directory>
     npm install
     ```
   - Run your Node.js application using PM2 (assuming your application runs on port 3000):
     ```bash
     pm2 start app.js --name my-app
     ```

### Running the Pipeline:

1. **Trigger Pipeline:**
   - Push any changes to your main branch or create a pull request to trigger the CI/CD pipeline.

2. **Check Pipeline Status:**
   - Visit your GitHub repository's Actions tab to monitor the progress and status of the pipeline.

### Accessing the Application:

1. **Access via Browser:**
   - Open a web browser and navigate to your domain name or public IP address.
   - You should see your Node.js application served through Nginx.

2. **Monitoring Application Logs:**
   - Monitor application logs using PM2:
     ```bash
     pm2 logs my-app
     ```

That's it! You have successfully set up a CI/CD pipeline using GitHub Actions and deployed your Node.js application on an Amazon EC2 instance with Nginx and PM2.
