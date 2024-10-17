import React, { useState } from "react";
import CipherFactory from "../../ui/EncryptDecrypt";
import CipherOverview from "../../ui/CipherOverview";

//TODO: import components from overview component
import {
  Header,
  Description,
  References,
  Example,
} from "../../overviews/BellasoOverview";

export default function BellasoCipher() {
  const [showOverview, setShowOverview] = useState(false);

  function encode(plaintext, keyword) {
    plaintext = plaintext.toUpperCase().replace(/[^A-Z]/g, "");
    keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "");
    let ciphertext = "";

    for (let i = 0; i < plaintext.length; i++) {
      let plainChar = plaintext.charCodeAt(i) - 65;
      let keyChar = keyword.charCodeAt(i % keyword.length) - 65;
      let encryptedChar = (plainChar + keyChar) % 26;
      ciphertext += String.fromCharCode(encryptedChar + 65);
    }

    return ciphertext;
  }

  function decode(ciphertext, keyword) {
    ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, "");
    keyword = keyword.toUpperCase().replace(/[^A-Z]/g, "");
    let plaintext = "";

    for (let i = 0; i < ciphertext.length; i++) {
      let cipherChar = ciphertext.charCodeAt(i) - 65;
      let keyChar = keyword.charCodeAt(i % keyword.length) - 65;
      let decryptedChar = (cipherChar - keyChar + 26) % 26;
      plaintext += String.fromCharCode(decryptedChar + 65);
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
        title={"Bellaso Cipher"}
        setShowOverview={setShowOverview}
        encode={encode}
        decode={decode}
        keyComponentA={"STR"}
      />
    </>
  );
}
