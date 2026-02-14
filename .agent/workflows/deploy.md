---
description: how to deploy the application
---

1. Ensure all environment variables from `.env` are set in the production environment.
2. Build the application for production:
```bash
npm run build
```
3. Start the production server:
```bash
npm start
```
4. Configure your MongoDB Atlas Vector Search Index according to the [deployment_guide.md](file:///Users/balakrishnareddyga/workspace/chatbot-llm/deployment_guide.md).
