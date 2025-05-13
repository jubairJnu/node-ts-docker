FROM node:20

# Set the working directory first
WORKDIR /app



# Install dependencies

COPY package.json .

RUN npm install
COPY . .


# Expose the desired port
EXPOSE 3001

# Run the development server
CMD ["npm", "run", "dev"]
