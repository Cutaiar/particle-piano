/*
 * Project particle-test
 * Description:
 * Author:
 * Date:
 */


// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  
  pinMode(D5, INPUT);
  pinMode(D6, INPUT);
  pinMode(A2, INPUT);
  pinMode(TX, INPUT);
  pinMode(D1, INPUT);
  pinMode(D2, INPUT);
  pinMode(D3, INPUT);
  pinMode(D4, INPUT);
  pinMode(D7, INPUT);
  pinMode(A7, INPUT);

  attachInterrupt(D5, handle_key_press, RISING);
  attachInterrupt(D6, handle_key_press, RISING);
  attachInterrupt(A2, handle_key_press, RISING);
  attachInterrupt(TX, handle_key_press, RISING);
  attachInterrupt(RX, handle_key_press, RISING);
  attachInterrupt(D1, handle_key_press, RISING);
  attachInterrupt(D2, handle_key_press, RISING);
  attachInterrupt(D3, handle_key_press, RISING);
  attachInterrupt(D4, handle_key_press, RISING);
  attachInterrupt(D7, handle_key_press, RISING);
  attachInterrupt(A7, handle_key_press, RISING);
  
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  // digitalWrite(led, HIGH);   // Turn ON the LED
  
  while(1){

  }
  
  String temp = String(random(60, 80));
  Particle.publish("temp", temp, PRIVATE);
  
}

raw_interrupt_handler_t handle_key_press() {
  char keys[11];
  int key_pressed = 0;
  keys[0] = digitalRead(D5);
  keys[1] = digitalRead(D6);
  keys[2] = digitalRead(A2);
  keys[3] = digitalRead(TX);
  keys[4] = digitalRead(RX);
  keys[5] = digitalRead(D1);
  keys[6] = digitalRead(D2);
  keys[7] = digitalRead(D3);
  keys[8] = digitalRead(D4);
  keys[9] = digitalRead(D7);
  keys[10] = digitalRead(A7);

  for (int i = 0; i <= 10; i++) {
    if (keys[i] == 1) {
      key_pressed = i;
    }
  }
  char * data = "{\"index\": {{{key_Pressed}}}}";
}
