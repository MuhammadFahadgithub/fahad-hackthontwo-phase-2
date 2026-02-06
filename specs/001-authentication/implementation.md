# Implementation — Authentication

## Approach
- Better Auth used on frontend for signup/signin
- JWT issued on login
- JWT sent in Authorization header to backend
- FastAPI verifies JWT using shared secret
- User ID from token must match URL user ID

## Status
- Frontend: In progress
- Backend: Pending

## Security Rules
- Missing/invalid JWT → 401
- User mismatch → 403
- Data filtered by authenticated user only

## Notes
- Backend implementation will follow after frontend completion
