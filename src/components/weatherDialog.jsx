import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

export default function WeatherDialog(props) {
  const { onClose, open, temperature } = props;
  console.log(temperature);
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="temperature-title"
      open={open}
    >
      <DialogTitle id="temperature-title">Temperature</DialogTitle>
      <DialogContent>{temperature && temperature.cod}</DialogContent>
    </Dialog>
  );
}
