import { Piano as RPiano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import * as Tone from "tone";

export interface IPianoProps {
  activeNote: number | undefined;
}

const synth = new Tone.Synth().toDestination();

const midiNumberToNote = (midiNote: number) => {
  const note_names = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  return note_names[midiNote % 12] + (midiNote / 12 - 1);
};

const convertIndexToMidiNumber = (midiNumber: number) => {
  console.log("converting " + midiNumber);
  return midiNumber + 53;
};

// TODO: center piano
export const Piano: React.FC<IPianoProps> = (props) => {
  const firstNote = MidiNumbers.fromNote("f3");
  const lastNote = MidiNumbers.fromNote("e5");

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <RPiano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber: number) => {
          console.log("play note: " + midiNumber);
          synth.triggerAttackRelease(midiNumberToNote(midiNumber), "8n");
        }}
        stopNote={(midiNumber: number) => {}}
        activeNotes={
          props.activeNote
            ? [convertIndexToMidiNumber(props.activeNote)]
            : undefined
        }
      />
    </div>
  );
};
