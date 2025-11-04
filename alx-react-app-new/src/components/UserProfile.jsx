function UserProfile(props) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '2px solid #e3f2fd',
      borderRadius: '12px',
      padding: '20px',
      margin: '20px 0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        color: '#1976d2',
        margin: '0 0 15px 0',
        fontSize: '24px',
        borderBottom: '2px solid #bbdefb',
        paddingBottom: '8px'
      }}>
        {props.name}
      </h2>
      <p style={{
        margin: '10px 0',
        fontSize: '16px',
        color: '#333'
      }}>
        Age: <span style={{
          fontWeight: 'bold',
          color: '#d32f2f',
          fontSize: '18px'
        }}>{props.age}</span>
      </p>
      <p style={{
        margin: '10px 0',
        fontSize: '16px',
        color: '#555',
        lineHeight: '1.5'
      }}>
        Bio: <span style={{
          fontStyle: 'italic',
          color: '#388e3c'
        }}>{props.bio}</span>
      </p>
    </div>
  );
}

export default UserProfile;