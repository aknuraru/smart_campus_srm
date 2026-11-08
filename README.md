# smart_campus_srm


# Smart Campus Room Availability Checker

Smart Campus Room Availability Checker is a web application designed to help university students and staff check the availability of campus rooms, apply capacity and equipment filters, and respect booking/maintenance rules.

## Requirements Covered
- **AC1–AC6**: Existing availability rules preserved (valid numeric time, 120-minute duration limit, overlapping bookings check, touch-points allowed, non-mutating data structure, clear visual state).
- **F1**: Capacity Filter (`room.capacity >= requested attendees`).
- **F2**: Equipment Filter (`room must contain ALL selected items`).
- **F3**: Blocked Room Integrity (`blocked` status enforced from room data).
- **F4**: Clear Empty State when filters yield zero matching rooms.
- **F5**: Real-time evaluation update when changing room selection.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install

### Running Locally
npm run dev

### Running Tests and Quality Checks
# Run Vitest test suite (29 tests)
npm test

# Run TypeScript type check
npm run typecheck

# Build for production
npm run build
