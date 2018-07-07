import React, { Component, Fragment } from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import blueGrey from "material-ui/colors/blueGrey";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "canvas-toBlob";
import "./SnapshotGenerator.css";

const theme = createMuiTheme({
  palette: {
    primary: blueGrey
  }
});

class SnapshotGenerator extends Component {
  state = {
    text: "Always deliver more than expected",
    size: 36,
    color: "#FFFFFF",
    background: "#EB4141"
  };

  _handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _generateAndSaveImage = () => {
    const { text } = this.state;

    html2canvas(this.ImageCanvas, { scale: 3 }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(
          blob,
          `${text
            .toLowerCase()
            .trim()
            .replace(/\s/g, "-")}.png`
        );
      });
    });
  };

  render() {
    const { text, size, color, background } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <main>
          <form className="SettingsForm" noValidate autoComplete="off">
            <TextField
              name="text"
              label="Text"
              value={text}
              margin="normal"
              onChange={this._handleChange}
            />
            <TextField
              name="size"
              label="Size (px)"
              type="number"
              min="18"
              max="96"
              step="18"
              value={size}
              margin="normal"
              className="NumberSelector"
              onChange={this._handleChange}
            />
            <TextField
              name="color"
              label="Text color"
              type="color"
              value={color}
              margin="normal"
              className="ColorPicker"
              onChange={this._handleChange}
            />
            <TextField
              name="background"
              label="Background"
              type="color"
              value={background}
              margin="normal"
              className="ColorPicker"
              onChange={this._handleChange}
            />
          </form>
          <div
            className="ImageCanvas"
            ref={ref => (this.ImageCanvas = ref)}
            style={{
              fontSize: `${parseFloat(size)}px`,
              color,
              background
            }}
          >
            {text}
          </div>
          <Button
            variant="raised"
            color="primary"
            onClick={this._generateAndSaveImage}
          >
            Download as PNG
          </Button>
        </main>
        <div className="BackgroundOverlay" style={{ background }} />
      </MuiThemeProvider>
    );
  }
}

export default SnapshotGenerator;
