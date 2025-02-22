import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Mail, Phone, User, Calendar, BookOpen, FileText, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        education: '',
        des: ''
    });

    // Fetch all students
    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://projectstudents-si2b.onrender.com/api/v1/getStudent');
            setStudents(response.data.data);
        } catch (err) {
            setError('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    // Delete student
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/DeleteStudent/${id}`);
                setStudents(students.filter(student => student._id !== id));
            } catch (err) {
                setError('Failed to delete student');
            }
        }
    };

    // Load student data for editing
    const handleEdit = (student) => {
        setEditMode(true);
        setSelectedStudentId(student._id);
        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone,
            gender: student.gender,
            age: student.age,
            education: student.education,
            des: student.description
        });
    };

    // Handle form submission (both create and update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (editMode) {
                const response = await axios.patch(
                    `http://localhost:8080/api/v1/UpdateStudent/${selectedStudentId}`,
                    formData
                );
                setStudents(students.map(student => 
                    student._id === selectedStudentId ? response.data.data : student
                ));
                setEditMode(false);
            } else {
                const response = await axios.post('http://localhost:8080/api/v1/register', formData);
                setStudents([...students, response.data.data]);
            }
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            gender: '',
            age: '',
            education: '',
            des: ''
        });
        setSelectedStudentId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <h1 className="display-4 fw-bold text-primary mb-5 text-center">
                    Student Dashboard
                </h1>

                {/* Form Section */}
                <div className="card shadow-lg mb-5">
                    <div className="card-header bg-primary text-white">
                        <h2 className="h4 mb-0">
                            {editMode ? 'Update Student' : 'Add New Student'}
                        </h2>
                    </div>
                    <div className="card-body p-4">
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show">
                                {error}
                                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label"><User size={16} className="me-2" />Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><Mail size={16} className="me-2" />Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><Phone size={16} className="me-2" />Phone</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label"><User size={16} className="me-2" />Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange} className="form-select" required>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><Calendar size={16} className="me-2" />Age</label>
                                        <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label"><BookOpen size={16} className="me-2" />Education</label>
                                        <select name="education" value={formData.education} onChange={handleChange} className="form-select" required>
                                            <option value="">Select</option>
                                            <option value="high_school">High School</option>
                                            <option value="bachelors">Bachelor's</option>
                                            <option value="masters">Master's</option>
                                            <option value="phd">Ph.D.</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label"><FileText size={16} className="me-2" />Description</label>
                                        <textarea name="des" value={formData.des} onChange={handleChange} className="form-control" rows="3" required></textarea>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary w-100">
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        {editMode ? 'Updating...' : 'Adding...'}
                                    </>
                                ) : (
                                    editMode ? 'Update Student' : 'Add Student'
                                )}
                            </button>
                            {editMode && (
                                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => {setEditMode(false); resetForm();}}>
                                    Cancel
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                {/* Data Table */}
                <div className="card shadow-lg">
                    <div className="card-header bg-primary text-white">
                        <h2 className="h4 mb-0">Student List</h2>
                    </div>
                    <div className="card-body p-0">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Gender</th>
                                            <th>Age</th>
                                            <th>Education</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(student => (
                                            <tr key={student._id}>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.phone}</td>
                                                <td>{student.gender}</td>
                                                <td>{student.age}</td>
                                                <td>{student.education}</td>
                                                <td>{student.description}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() => handleEdit(student)}
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(student._id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;