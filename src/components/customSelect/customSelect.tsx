import React, { useState, ReactNode } from 'react';
import styles from "./customSelect.module.scss";

interface CustomSelectProps {
  children: ReactNode,
  inputValue: string | undefined,
  dataName: string,
  resultContent: ReactNode,
  isDisabled?: boolean,
}

const CustomSelect = ({ inputValue, children, dataName, resultContent, isDisabled = false }: CustomSelectProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.customSelect}>
      <input disabled={isDisabled} value={inputValue || ""} onClick={() => setIsOpen(prev => !prev)} placeholder={`Selecionar ${dataName}`}/>
      <ul className={ isOpen ? styles['customSelect__opened-list'] : styles['customSelect__closed-list'] } onClick={() => setIsOpen(false)}>
        { children }
      </ul>
      <div className={ inputValue ? styles['customSelect__result--opened'] : styles['customSelect__result--closed']}>
        { resultContent }
      </div>
    </div>
  );
}

export default CustomSelect;
