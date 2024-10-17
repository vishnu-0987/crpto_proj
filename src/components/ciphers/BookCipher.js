import React, { useState } from "react";
import CipherFactory from "../../ui/EncryptDecrypt";
import CipherOverview from "../../ui/CipherOverview";

//TODO: import components from overview component
import {
  Header,
  Description,
  References,
  Example,
} from "../../overviews/BookOverview";

const BookCipher = () => {
  const [showOverview, setShowOverview] = useState(false);

  function getPositionInKey(text, key) {
    const positions = [];
    const keyWords = key.toUpperCase().split(/\s+/);

    for (let char of text) {
      const charUpper = char.toUpperCase();
      let found = false;
      for (let i = 0; i < keyWords.length; i++) {
        const wordIndex = keyWords[i].indexOf(charUpper);
        if (wordIndex !== -1) {
          positions.push({ word: i + 1, char: wordIndex + 1 });
          found = true;
          break;
        }
      }
      if (!found) {
        // Handle the case where the character is not found in the key text
        positions.push({ word: 0, char: 0 });
      }
    }

    return positions;
  }

  function encode(plaintext, key) {
    plaintext = plaintext.toUpperCase(plaintext);
    console.log(plaintext);
    const positions = getPositionInKey(plaintext, key);
    return positions.map((pos) => `${pos.word}.${pos.char}`).join(" ");
  }

  function decode(ciphertext, key) {
    const keyWords = key.split(/\s+/);
    const positions = ciphertext.split(" ");
    let plaintext = "";

    for (let pos of positions) {
      const [wordIndex, charIndex] = pos.split(".").map(Number);
      if (
        wordIndex > 0 &&
        charIndex > 0 &&
        keyWords[wordIndex - 1] &&
        keyWords[wordIndex - 1][charIndex - 1]
      ) {
        plaintext += keyWords[wordIndex - 1][charIndex - 1];
      } else {
        plaintext += " "; // Placeholder for unfound characters
      }
    }

    return plaintext;
  }

  return (
    <>
      {showOverview && (
        <CipherOverview
          setShowOverview={setShowOverview}
          Header={Header}
          Description={Description}
          Example={Example}
          References={References}
        />
      )}
      <CipherFactory
        title={"Book Cipher"}
        setShowOverview={setShowOverview}
        encode={encode}
        decode={decode}
        keyComponentA="STR"
      />
    </>
  );
};

export default BookCipher;
