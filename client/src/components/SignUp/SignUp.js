import React, {useState} from 'react';
function SignUp() {
  const [password, setPassword] = useState('');
  const handleGeneratePassword = event => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    setPassword(password);
  };
}

export default SignUp;
