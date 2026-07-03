import React, { useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieChart } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleAnalyze = async () => {
    if (!url) return alert('Please paste a product URL');
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/analyze', { url });
      setData(response.data);
    } catch (error) {
      console.error("Error connecting to backend server", error);
      alert('Failed to analyze data. Make sure backend app.py is running.');
    }
    setLoading(false);
  };

  const chartData = data ? {
    labels: ['Positive Feedback', 'Negative Feedback', 'Neutral Content'],
    datasets: [{
      data: [data.metrics.positive, data.metrics.negative, data.metrics.neutral],
      backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
      borderWidth: 0,
      hoverOffset: 8,
    }]
  } : null;

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#E5E7EB', font: { size: 13 } }
      }
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0F172A', color: '#F8FAFC', fontFamily: '"Segoe UI", sans-serif' }}>
      
      {/* SIDEBAR PANEL LOOK */}
      <div style={{ width: '280px', backgroundColor: '#1E293B', padding: '40px 20px', borderRight: '1px solid #334155' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#38BDF8', marginBottom: '30px' }}>
          📊 Sentiment AI
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6' }}>
          Analyze dynamic review text data using Natural Language Processing instantly.
        </p>
        <div style={{ marginTop: '100px', fontSize: '12px', color: '#64748B' }}>
          Project Dashboard Live • 2026
        </div>
      </div>

      {/* MAIN SYSTEM WRAPPER */}
      <div style={{ flex: 1, padding: '40px' }}>
        
        {/* TOP HEADER HEADER SECTION */}
        <div style={{ marginBottom: '35px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '10px' }}>E-Commerce Review Hub Analytics</h1>
          <p style={{ color: '#94A3B8', marginBottom: '25px' }}>Scrape real-time trends to monitor product performance metrics at a glance.</p>
          
          {/* MODERN SEARCH CONTAINER BAR */}
          <div style={{ display: 'flex', gap: '15px', backgroundColor: '#1E293B', padding: '10px', borderRadius: '12px', border: '1px solid #334155' }}>
            <input 
              type="text" 
              placeholder="Paste Amazon or Flipkart product url link here..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', border: 'none', color: '#FFF', fontSize: '15px', outline: 'none' }}
            />
            <button 
              onClick={handleAnalyze} 
              style={{ padding: '12px 28px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              {loading ? 'Processing Analysis...' : 'Run Analysis Metrics'}
            </button>
          </div>
        </div>

        {/* METRICS VIEW BLOCKS */}
        {data && (
          <div>
            {/* KPI TOP GRID CARDS */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '35px' }}>
              <div style={{ flex: 1, backgroundColor: '#1E293B', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #10B981' }}>
                <span style={{ color: '#94A3B8', fontSize: '14px' }}>Positive Score</span>
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#10B981', margin: '5px 0 0 0' }}>{data.metrics.positive}%</h3>
              </div>
              <div style={{ flex: 1, backgroundColor: '#1E293B', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #EF4444' }}>
                <span style={{ color: '#94A3B8', fontSize: '14px' }}>Negative Score</span>
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#EF4444', margin: '5px 0 0 0' }}>{data.metrics.negative}%</h3>
              </div>
              <div style={{ flex: 1, backgroundColor: '#1E293B', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #F59E0B' }}>
                <span style={{ color: '#94A3B8', fontSize: '14px' }}>Neutral Content</span>
                <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#F59E0B', margin: '5px 0 0 0' }}>{data.metrics.neutral}%</h3>
              </div>
            </div>

            {/* TWO SPLIT SECTION BLOCK ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' }}>
              
              {/* VISUAL CHART BOX DISPLAY */}
              <div style={{ backgroundColor: '#1E293B', padding: '30px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px', alignSelf: 'flex-start' }}>Visual Metrics Share</h3>
                <div style={{ width: '250px', height: '250px' }}>
                  <PieChart data={chartData} options={chartOptions} />
                </div>
              </div>
              
              {/* REVIEWS DISPLAY STREAM PANEL */}
              <div style={{ backgroundColor: '#1E293B', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Classified Reviews Stream Logs</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
                  {data.reviews.map((item, index) => (
                    <div key={index} style={{ padding: '12px 0', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                      <p style={{ margin: '0', fontSize: '14px', color: '#E2E8F0', flex: 1 }}>"{item.review}"</p>
                      <span style={{ 
                        fontSize: '11px', padding: '4px 10px', borderRadius: '20px', fontWeight: '600',
                        backgroundColor: item.sentiment === 'Positive' ? 'rgba(16, 185, 129, 0.15)' : item.sentiment === 'Negative' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: item.sentiment === 'Positive' ? '#34D399' : item.sentiment === 'Negative' ? '#F87171' : '#FBBF24',
                        border: `1px solid ${item.sentiment === 'Positive' ? '#10B981' : item.sentiment === 'Negative' ? '#EF4444' : '#F59E0B'}`
                      }}>
                        {item.sentiment}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;