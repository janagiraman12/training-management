import React, { useState, useEffect } from 'react';
import { Book, Users, Calendar, GraduationCap, Award, Target, TrendingUp, ChevronLeft, ChevronRight, Sparkles, BookOpen, Brain } from 'lucide-react';

const Dashboard = ({ subjects, courses, batches, students, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to Training Hub",
      subtitle: "Empowering Education Through Smart Management",
      description: "Streamline your training programs with our comprehensive management system",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: GraduationCap
    },
    {
      title: "Manage Your Courses",
      subtitle: "Create, Organize, and Track Everything",
      description: "From subjects to students, manage your entire training ecosystem in one place",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: BookOpen
    },
    {
      title: "Track Student Progress",
      subtitle: "Data-Driven Education Management",
      description: "Monitor enrollments, batch schedules, and student performance effortlessly",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: Brain
    }
  ];

  const cards = [
    { title: 'Subjects', count: subjects.length, icon: Book, color: '#3b82f6', path: 'subjects', description: 'Total subjects available' },
    { title: 'Courses', count: courses.length, icon: GraduationCap, color: '#8b5cf6', path: 'courses', description: 'Active training programs' },
    { title: 'Batches', count: batches.length, icon: Calendar, color: '#ec4899', path: 'batches', description: 'Scheduled batch sessions' },
    { title: 'Students', count: students.length, icon: Users, color: '#10b981', path: 'students', description: 'Enrolled learners' }
  ];

  const features = [
    {
      icon: Target,
      title: "Organized Learning",
      description: "Structure your training programs with subjects, courses, and batches"
    },
    {
      icon: Award,
      title: "Student Management",
      description: "Track and manage student enrollments across different programs"
    },
    {
      icon: TrendingUp,
      title: "Real-time Insights",
      description: "Get instant overview of your entire training ecosystem"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="dashboard">
      {/* Hero Slideshow Section */}
      <div className="hero-slideshow">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ background: slide.gradient }}
            >
              <div className="slide-content">
                <div className="slide-icon">
                  <slide.icon size={64} strokeWidth={1.5} />
                </div>
                <h1>{slide.title}</h1>
                <h2>{slide.subtitle}</h2>
                <p>{slide.description}</p>
                <div className="slide-sparkles">
                  <Sparkles className="sparkle" size={20} />
                  <Sparkles className="sparkle" size={16} />
                  <Sparkles className="sparkle" size={18} />
                </div>
              </div>
            </div>
          ))}
          
          <button className="slide-btn prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="slide-btn next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
          
          <div className="slide-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="stats-section">
        <div className="section-header">
          <h2>Quick Overview</h2>
          <p>Your training management at a glance</p>
        </div>
        
        <div className="dashboard-grid">
          {cards.map(card => (
            <div 
              key={card.title} 
              className="dashboard-card enhanced"
              onClick={() => onNavigate(card.path)}
            >
              <div className="card-background" style={{ background: card.color }}></div>
              <div className="card-icon-large" style={{ color: card.color }}>
                <card.icon size={40} strokeWidth={2} />
              </div>
              <div className="card-content">
                <h3>{card.count}</h3>
                <p className="card-title">{card.title}</p>
                <p className="card-description">{card.description}</p>
              </div>
              <div className="card-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose Training Hub?</h2>
          <p>Powerful features to streamline your training management</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={32} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Begin by adding subjects to build your training programs</p>
          <button className="cta-button" onClick={() => onNavigate('subjects')}>
            <Book size={20} />
            Add Your First Subject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
