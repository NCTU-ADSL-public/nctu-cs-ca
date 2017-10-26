import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/editor/vertical-align-top'

const homeIcon = <ContentAdd />;

const style = {
    marginRight: 20,
};

const IconButtonExampleTooltip = () => (
    <div>
        <MuiThemeProvider>
            <FloatingActionButton
                style={style}
                backgroundColor = "grey">
                {homeIcon}
            </FloatingActionButton>
        </MuiThemeProvider>
    </div>
);

export default IconButtonExampleTooltip;