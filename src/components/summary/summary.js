import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'

const Summary = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={4} xs={12} >
                    <Card>
                        <CardContent>
                            <Typography component='p'>Number of cases of covid</Typography>
                            <Typography component='p'>2222</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={4} xs={12} >
                    <Card>
                        <CardContent>
                            <Typography component='p'>Number of cases of covid</Typography>
                            <Typography component='p'>2222</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={4} xs={12} >
                    <Card>
                        <CardContent>
                            <Typography component='p'>Number of cases of covid</Typography>
                            <Typography component='p'>222</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Summary