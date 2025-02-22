import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, Phone, User, Calendar, BookOpen, FileText } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    education: '',
    des: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://projectstudents-si2b.onrender.com/api/v1/register', formData);
      if (response.data.success) {
        setSuccess('Registration successful! ');
        setFormData({
          name: '',
          email: '',
          phone: '',
          gender: '',
          age: '',
          education: '',
          des: ''
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Alert = ({ type, children }) => {
    const alertClass = type === 'error' ? 'alert-danger' : 'alert-success';
    return (
      <div className={`alert ${alertClass} alert-dismissible fade show`} role="alert">
        {children}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    );
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        {/* Header Section with Animation */}
        <div className="text-center mb-5 animate__animated animate__fadeInDown">
          <h1 className="display-4 fw-bold text-primary mb-3">
            <UserPlus className="me-2" size={40} />
            Student Registration
          </h1>
          <p className="lead text-muted">Embark on your learning journey today</p>
        </div>

        {/* Main Form Card */}
        <div className="card shadow-lg border-0 animate__animated animate__fadeInUp">
          <div className="card-header bg-primary text-white py-3">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <UserPlus size={24} />
              <h2 className="h4 mb-0">Create Your Student Profile</h2>
            </div>
          </div>

          <div className="card-body p-4 p-md-5">
            {/* Alerts */}
            {error && <Alert type="error">{error}</Alert>}
            {success && <Alert type="success">{success}</Alert>}

            {/* Form Content */}
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Left Column */}
                <div className="col-md-6">
                  {/* Name Input */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <User size={16} className="me-2 text-primary" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <Mail size={16} className="me-2 text-primary" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <Phone size={16} className="me-2 text-primary" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  {/* Gender Select */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <User size={16} className="me-2 text-primary" />
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-select form-select-lg"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Age Input */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <Calendar size={16} className="me-2 text-primary" />
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      required
                      min="1"
                      max="120"
                      placeholder="Your age"
                    />
                  </div>

                  {/* Education Select */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <BookOpen size={16} className="me-2 text-primary" />
                      Education Level
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="form-select form-select-lg"
                      required
                    >
                      <option value="">Select Education Level</option>
                      <option value="high_school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">Ph.D.</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Full Width Description */}
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      <FileText size={16} className="me-2 text-primary" />
                      About Yourself
                    </label>
                    <textarea
                      name="des"
                      value={formData.des}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      rows="4"
                      required
                      placeholder="Tell us about your background and interests..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Registering...
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      Join Now
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          {/* <div className="card-footer text-center py-3 bg-light">
            <p className="mb-0 text-muted">
              Already registered?{' '}
              <a href="#" className="text-primary text-decoration-none fw-medium">
                Sign in here
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Register;