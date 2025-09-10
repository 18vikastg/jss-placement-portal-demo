import { VALIDATION_RULES } from './constants';

// Validation utility functions

// Validate email
export const validateEmail = (email) => {
  const pattern = VALIDATION_RULES.EMAIL.PATTERN;
  return pattern.test(email);
};

// Validate password
export const validatePassword = (password) => {
  const { MIN_LENGTH, MAX_LENGTH, PATTERN } = VALIDATION_RULES.PASSWORD;
  
  if (password.length < MIN_LENGTH) {
    return { isValid: false, message: `Password must be at least ${MIN_LENGTH} characters long` };
  }
  
  if (password.length > MAX_LENGTH) {
    return { isValid: false, message: `Password must be no more than ${MAX_LENGTH} characters long` };
  }
  
  if (!PATTERN.test(password)) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' 
    };
  }
  
  return { isValid: true };
};

// Validate username
export const validateUsername = (username) => {
  const { MIN_LENGTH, MAX_LENGTH, PATTERN } = VALIDATION_RULES.USERNAME;
  
  if (username.length < MIN_LENGTH) {
    return { isValid: false, message: `Username must be at least ${MIN_LENGTH} characters long` };
  }
  
  if (username.length > MAX_LENGTH) {
    return { isValid: false, message: `Username must be no more than ${MAX_LENGTH} characters long` };
  }
  
  if (!PATTERN.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  
  return { isValid: true };
};

// Validate phone number
export const validatePhone = (phone) => {
  const pattern = VALIDATION_RULES.PHONE.PATTERN;
  return pattern.test(phone);
};

// Validate required field
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true };
};

// Validate file upload
export const validateFile = (file, options = {}) => {
  const { maxSize, allowedTypes } = options;
  
  if (!file) {
    return { isValid: false, message: 'No file selected' };
  }
  
  if (maxSize && file.size > maxSize) {
    return { isValid: false, message: `File size must be less than ${formatFileSize(maxSize)}` };
  }
  
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return { isValid: false, message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
  }
  
  return { isValid: true };
};

// Validate form data
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = formData[field];
    
    // Required validation
    if (rule.required) {
      const requiredValidation = validateRequired(value, rule.label || field);
      if (!requiredValidation.isValid) {
        errors[field] = requiredValidation.message;
        return;
      }
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rule.required) {
      return;
    }
    
    // Email validation
    if (rule.type === 'email') {
      if (!validateEmail(value)) {
        errors[field] = 'Please enter a valid email address';
      }
    }
    
    // Password validation
    if (rule.type === 'password') {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        errors[field] = passwordValidation.message;
      }
    }
    
    // Username validation
    if (rule.type === 'username') {
      const usernameValidation = validateUsername(value);
      if (!usernameValidation.isValid) {
        errors[field] = usernameValidation.message;
      }
    }
    
    // Phone validation
    if (rule.type === 'phone') {
      if (!validatePhone(value)) {
        errors[field] = 'Please enter a valid phone number';
      }
    }
    
    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters long`;
    }
    
    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must be no more than ${rule.maxLength} characters long`;
    }
    
    // Custom validation
    if (rule.custom && typeof rule.custom === 'function') {
      const customValidation = rule.custom(value, formData);
      if (!customValidation.isValid) {
        errors[field] = customValidation.message;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format file size helper
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Common validation rules
export const COMMON_RULES = {
  firstName: {
    required: true,
    label: 'First Name',
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    required: true,
    label: 'Last Name',
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    type: 'email',
    label: 'Email Address'
  },
  phone: {
    required: true,
    type: 'phone',
    label: 'Phone Number'
  },
  username: {
    required: true,
    type: 'username',
    label: 'Username'
  },
  password: {
    required: true,
    type: 'password',
    label: 'Password'
  },
  location: {
    required: true,
    label: 'Location',
    minLength: 5,
    maxLength: 100
  },
  objective: {
    required: true,
    label: 'Objective',
    minLength: 50,
    maxLength: 500
  }
};
