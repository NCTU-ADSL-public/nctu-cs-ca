import React from 'react';
import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
    width: '10%',
    marginBottom: 16,
  },
};

function handler(event){
    alert('1');
}

const ToggleButtom = () => (
  <Toggle
      label="style"
      style={styles.toggle}
      onToggle={
      	handler
      }
    />
);

export default ToggleButtom;