import './InputLogin.css'

function InputLogin({ title, value, onChange }) {

    const handleChange = (e) => {
        onChange(e.target.value);
    }

    return (
        <input
            type={title === 'contrasenia' ? 'password' : 'text'}
            placeholder={title}
            value={value}
            onChange={handleChange}
        />
    );
}

export { InputLogin };