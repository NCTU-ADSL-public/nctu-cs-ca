import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

const RadioButtonExampleSimple = () => (
    <div>
        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            <RadioButton
                value="must"
                label="必修"
                style={styles.radioButton}
            />
            <RadioButton
                value="not_yet_must"
                label="必選修"
                style={styles.radioButton}
            />
            <RadioButton
                value="completed"
                label="已修"
                style={styles.radioButton}
            />
            <RadioButton
                value="not_completed"
                label="未修"
                style={styles.radioButton}
            />
            <RadioButton
                value="Suggest"
                label="建議修課"
                style={styles.radioButton}
            />
        </RadioButtonGroup>

    </div>
);

export default RadioButtonExampleSimple;