# (app)

This directory represents a route group in Expo Router. All routes within this group are designed to be accessible only to authenticated users.

## Session Control

Authentication for this route group is managed globally in the root layout file (`app/_layout.tsx`). A `useEffect` hook within the `MainStack` component handles the session validation and redirection logic.

### How it Works

1.  **Session Check**: The `useSession` hook checks if a user session is active.
2.  **Route Analysis**: The `useSegments` hook determines if the user is trying to access a route within the `(app)` group.
3.  **Redirection**:
    *   If a user **without a session** attempts to access a route inside `(app)`, they are redirected to the `/login` screen.
    *   If a user **with a session** is outside the `(app)` group (e.g., on the login screen), they are redirected to `/home`.

This centralized approach in the root layout ensures that all screens within this `(app)` group are protected and only accessible after a successful login.