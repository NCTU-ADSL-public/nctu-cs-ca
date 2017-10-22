import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TableExampleComplex from './HistoryCourse';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    tab: {
        fontSize: 24,
        fontWeight: 800,
        height: 50,
        color: '#00AEAE',
    },
    tabActive: {
        color: '',
    },
};

function handleActive(tab) {

}
const TabsExampleSimple = () => (
    <Tabs>
        <Tab label="歷年課程" style={styles.tab} onActive={handleActive} key='1'>
                <TableExampleComplex/>
        </Tab>
        <Tab label="當期課程" style={styles.tab} onActive={handleActive} key='2'>
            <div>
                <h2 style={styles.headline}>當期課程</h2>
                <p>
                    This is another example tab.
                </p>
            </div>
        </Tab>
    </Tabs>
);

export default TabsExampleSimple;