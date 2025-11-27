# Dynamic Form Component - Flexible Sizing

The dynamic form now supports a flexible sizing system based on a 12-column grid (2-12), allowing fields to automatically arrange responsively across multiple rows and columns.

## Field Sizing

Each field can have a `size` property ranging from 2 to 12:

- **2**: ~16.67% width (6 fields per row on desktop)
- **3**: 25% width (4 fields per row)
- **4**: ~33.33% width (3 fields per row)
- **6**: 50% width (2 fields per row)
- **8**: ~66.67% width
- **12**: 100% width (full row) - **default**

Fields automatically wrap to new rows based on available space.

## Usage Example

```typescript
const formConfig: FormConfig = {
  gap: 4, // spacing between fields (2, 3, 4, 6, or 8)
  submitLabel: 'Save',
  resetLabel: 'Clear',
  properties: {
    // Full width field
    companyName: {
      label: 'Company Name',
      type: 'text',
      size: 12, // full width
      validators: [{ type: 'required' }],
    },

    // Two fields side by side (50% each)
    firstName: {
      label: 'First Name',
      type: 'text',
      size: 6,
      validators: [{ type: 'required' }],
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
      size: 6,
      validators: [{ type: 'required' }],
    },

    // Three fields in a row (33% each)
    city: {
      label: 'City',
      type: 'text',
      size: 4,
    },
    state: {
      label: 'State',
      type: 'text',
      size: 4,
    },
    zipCode: {
      label: 'ZIP Code',
      type: 'text',
      size: 4,
    },

    // Mixed sizes
    email: {
      label: 'Email',
      type: 'text',
      size: 8, // 66%
      validators: [{ type: 'email' }],
    },
    phone: {
      label: 'Phone',
      type: 'text',
      size: 4, // 33%
    },

    // Full width textarea
    description: {
      label: 'Description',
      type: 'text-area',
      size: 12,
      placeholder: 'Enter description...',
    },
  },
};
```

## Responsive Behavior

- **Mobile**: All fields default to full width (100%)
- **Desktop (md breakpoint)**: Fields use their specified size

## Key Changes from Previous Version

### Before (Grid-based)

```typescript
{
  inline?: boolean,
  columns?: 1 | 2 | 3,
  properties: { ... }
}
```

### After (Flexible Sizing)

```typescript
{
  gap?: 2 | 3 | 4 | 6 | 8,
  properties: {
    fieldName: {
      // ... other props
      size?: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    }
  }
}
```

## Benefits

1. **More Flexible**: Mix different field widths in the same form
2. **Automatic Wrapping**: Fields wrap naturally to new rows
3. **Responsive by Default**: Mobile-first approach with desktop enhancements
4. **Intuitive**: Uses familiar 12-column grid system
5. **Dynamic Layouts**: Create complex layouts without predefined grid structures
