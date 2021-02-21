import { Piano as RPiano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import * as Tone from "tone";

export interface IPianoProps {
  activeNote: number | undefined;
}
// TODO: figure out conversion for correct tone playing (key highlights will work when this is correct)
// TODO: use memo and callback
export const Piano: React.FC<IPianoProps> = (props) => {
  const firstNote = MidiNumbers.fromNote("c2");
  const lastNote = MidiNumbers.fromNote("B3");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  const synth = new Tone.Synth().toDestination();
  const convertMidiNumberForTone = (midiNumber: number) => {
    return midiNumber + 50;
  };

  return (
    <RPiano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber: number) => {
        synth.triggerAttackRelease(convertMidiNumberForTone(midiNumber), "8n");
      }}
      activeNotes={
        props.activeNote
          ? [convertMidiNumberForTone(props.activeNote)]
          : undefined
      }
      width={700}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};
