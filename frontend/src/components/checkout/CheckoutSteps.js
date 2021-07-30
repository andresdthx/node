import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const steps = ['Sign in', 'Shipping address', 'Payment', 'Review your order'];

export default function CheckoutSteps(props) {
  const [activeStep, setActiveStep] = React.useState(1);

  useEffect(() => {
      setActiveStep(props.step);
  }, [activeStep, props]);

  return (
    <React.Fragment>
      <main>
        <Paper className="">
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </main>
    </React.Fragment>
  );
}