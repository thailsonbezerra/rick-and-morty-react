import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string
    label?: string
    name: string
    placeholder?: string
  }

const Input = ({ label, type, name, placeholder, value, onChange}: InputProps) => {
    return (
        <div className={styles.wrapper}>
            {label && <label htmlFor={name} className={styles.label}>{label}</label>}
            <input id={name} name={name} placeholder={placeholder}className={styles.input} type={type} onChange={onChange} value={value}/>
        </div>
    )
}
 
export default Input;