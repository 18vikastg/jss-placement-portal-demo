// Enhanced validation utilities for NewLinkFolio
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  }
};

// Advanced validation functions
export const validateEmail = (email) => {
  if (!email) return { isValid: false, message: 'Email is required' };
  if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  return { isValid: true };
};

export const validatePassword = (password) => {
  const { MIN_LENGTH, MAX_LENGTH, PATTERN } = VALIDATION_RULES.PASSWORD;
  
  if (!password) return { isValid: false, message: 'Password is required' };
  
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

export const validateName = (name, fieldName) => {
  const { MIN_LENGTH, MAX_LENGTH, PATTERN } = VALIDATION_RULES.NAME;
  
  if (!name) return { isValid: false, message: `${fieldName} is required` };
  
  if (name.length < MIN_LENGTH) {
    return { isValid: false, message: `${fieldName} must be at least ${MIN_LENGTH} characters long` };
  }
  
  if (name.length > MAX_LENGTH) {
    return { isValid: false, message: `${fieldName} must be no more than ${MAX_LENGTH} characters long` };
  }
  
  if (!PATTERN.test(name)) {
    return { isValid: false, message: `${fieldName} can only contain letters and spaces` };
  }
  
  return { isValid: true };
};

export const validatePhone = (phone) => {
  if (!phone) return { isValid: false, message: 'Phone number is required' };
  if (!VALIDATION_RULES.PHONE.PATTERN.test(phone)) {
    return { isValid: false, message: 'Please enter a valid phone number' };
  }
  return { isValid: true };
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true };
};

// Comprehensive form validation
export const validateProfileForm = (formData) => {
  const errors = {};
  
  // Validate first name
  const firstNameValidation = validateName(formData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.message;
  }
  
  // Validate last name
  const lastNameValidation = validateName(formData.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.message;
  }
  
  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }
  
  // Validate phone
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
  }
  
  // Validate location
  const locationValidation = validateRequired(formData.location, 'Location');
  if (!locationValidation.isValid) {
    errors.location = locationValidation.message;
  }
  
  // Validate objective
  const objectiveValidation = validateRequired(formData.objective, 'Objective');
  if (!objectiveValidation.isValid) {
    errors.objective = objectiveValidation.message;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Real-time field validation
export const validateField = (fieldName, value, formData = {}) => {
  switch (fieldName) {
    case 'firstName':
      return validateName(value, 'First name');
    case 'lastName':
      return validateName(value, 'Last name');
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'location':
      return validateRequired(value, 'Location');
    case 'objective':
      return validateRequired(value, 'Objective');
    case 'password':
      return validatePassword(value);
    default:
      return { isValid: true };
  }
};

// File upload validation
export const validateFile = (file, options = {}) => {
  const { maxSize = 2 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png'] } = options;
  
  if (!file) return { isValid: false, message: 'No file selected' };
  
  if (file.size > maxSize) {
    return { 
      isValid: false, 
      message: `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB` 
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { 
      isValid: false, 
      message: `File type must be one of: ${allowedTypes.join(', ')}` 
    };
  }
  
  return { isValid: true };
};

// Password strength checker
export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, level: 'None', color: 'gray' };
  
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[@$!%*?&]/.test(password),
  };
  
  Object.values(checks).forEach(check => {
    if (check) score += 20;
  });
  
  if (score <= 20) return { strength: score, level: 'Very Weak', color: 'red' };
  if (score <= 40) return { strength: score, level: 'Weak', color: 'orange' };
  if (score <= 60) return { strength: score, level: 'Fair', color: 'yellow' };
  if (score <= 80) return { strength: score, level: 'Good', color: 'blue' };
  return { strength: score, level: 'Strong', color: 'green' };
};
