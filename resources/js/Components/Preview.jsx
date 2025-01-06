import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Preview = ({ invoiceData, docStyle }) => {
  const [logoPreview, setLogoPreview] = useState(invoiceData.logo || "");
  const [titleColor, setTitleColor] = useState(docStyle.titleColor || "#5C3D64");
  const [tableColor, setTableColor] = useState(docStyle.tableColor || "#000000");
  const [font, setFont] = useState(docStyle.font || "Lato, sans-serif");
  const [backgroundColor, setBackgroundColor] = useState(
    docStyle.backgroundColor || "#ffffff"
  );

  // Generate PDF
  const generatePDF = () => {
    const content = document.getElementById("invoice-preview");
    const options = { scale: 2 };

    html2canvas(content, options)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${invoiceData.invoiceNumber || "facture"}.pdf`);
      })
      .catch((err) => {
        console.error("PDF generation error:", err);
      });
  };

// Calcul des totaux
const subtotal = invoiceData.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );
  const taxAmount = (subtotal * invoiceData.taxRate) / 100;
  const total = subtotal + taxAmount - invoiceData.discount;

// Fonction pour convertir les montants en toutes lettres
const numberToWords = (nombre) => {
    const unite = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const dizaine = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
    const special = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    
    function moinsDeCent(n) {
        if (n < 10) return unite[n];
        if (n < 20) return special[n - 10];
        const d = Math.floor(n / 10);
        const u = n % 10;
        const sep = (d === 7 || d === 9) ? "-" : (u === 1 ? "-et-" : "-");
        return dizaine[d] + (u > 0 ? sep + unite[u] : "");
    }

    function moinsDeMille(n) {
        const c = Math.floor(n / 100);
        const reste = n % 100;
        if (c === 0) return moinsDeCent(reste);
        if (c === 1) return "cent" + (reste > 0 ? " " + moinsDeCent(reste) : "");
        return unite[c] + " cent" + (reste > 0 ? " " + moinsDeCent(reste) : "");
    }

    function enLettres(n) {
        if (n === 0) return "zéro";
        if (n > 999999) return "Nombre trop grand";
        
        const milles = Math.floor(n / 1000);
        const reste = n % 1000;

        let resultat = "";
        if (milles > 0) {
            resultat += (milles === 1 ? "mille" : moinsDeMille(milles)) + " ";
        }
        if (reste > 0) {
            resultat += moinsDeMille(reste);
        }
        return resultat.trim();
    }

    return enLettres(nombre);
};

  return (
    <div className="flex w-full ">
      <aside className="w-[20%] bg-gray-100 p-4 border-r overflow-y-auto fixed h-full flex flex-col">
        <h2 className="text-lg font-bold mb-4">Configurer l'agencement</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Couleur du titre</label>
          <input
            type="color"
            value={titleColor}
            onChange={(e) => setTitleColor(e.target.value)}
            className="w-full h-10 p-1"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Couleur du tableau</label>
          <input
            type="color"
            value={tableColor}
            onChange={(e) => setTableColor(e.target.value)}
            className="w-full h-10 p-1"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Police</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="Lato, sans-serif">Lato</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Times New Roman, serif">Times New Roman</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Couleur de l'arrière-plan
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-full h-10 p-1"
          />
        </div>
        <button
          onClick={generatePDF}
          className="mt-4 px-4 py-2 bg-[#2A2A2A] text-white rounded hover:bg-blue-700"
        >
          Télécharger PDF
        </button>
        <button
          className="mt-4 px-4 py-2 bg-[#2A2A2A] text-white rounded hover:bg-blue-700"
        >
          Envoyer Par Mail
        </button>
      </aside>

      <main 
        className="flex-1 p-6 ml-72">
        <h1 className="text-3xl text-center font-bold mb-4 underline">Aperçu de la facture</h1>
        <div
            id="invoice-preview"
            className="p-6 border rounded-lg bg-white mx-auto w-[210mm] h-[297mm]"
            style={{
                fontFamily: font,
                backgroundColor: backgroundColor
            }}
            >
            {/* En-tête */}
            <div className="flex justify-between items-center mb-5">
                <img
                src={invoiceData.company.logoUrl}
                alt="Logo de l'entreprise"
                className="max-h-20"
                />
                <div className="text-right">
                <p>{invoiceData.company.name}</p>
                <p>{invoiceData.company.address}</p>
                <p>{invoiceData.company.country}</p>
                <p>ICE: {invoiceData.company.taxId}</p>
                </div>
            </div>

            {/* Titre Facture */}
            <div className="text-right mb-5">
                <h1
                className="text-3xl font-bold"
                style={{ color: titleColor }}
                >
                Facture {invoiceData.invoiceNumber}
                </h1>
            </div>

            {/* Informations sur les dates */}
            <div className="grid grid-cols-2 gap-4 border rounded p-4 mb-5">
                <div>
                <p className="font-semibold">Date de facturation</p>
                <p>{invoiceData.invoiceDate}</p>
                </div>
                <div>
                <p className="font-semibold">Date d'échéance</p>
                <p>{invoiceData.dueDate}</p>
                </div>
            </div>
            
            {/* Client */}
            <div className="text-left mb-5">
                <p>{invoiceData.client.name}</p>
                <p>{invoiceData.client.address}</p>
                <p>{invoiceData.client.email}</p>
            </div>

            {/* Tableau des produits/services */}
            <table className="w-full border-collapse border mb-5">
                <thead>
                <tr style={{ backgroundColor: tableColor, color: "#FFF" }}>
                    <th className="text-left p-2 border">DESCRIPTION</th>
                    <th className="text-right p-2 border">QUANTITÉ</th>
                    <th className="text-right p-2 border">PRIX UNITAIRE</th>
                    <th className="text-right p-2 border">TAXES</th>
                    <th className="text-right p-2 border">MONTANT</th>
                </tr>
                </thead>
                <tbody>
                {invoiceData.items.map((item, index) => (
                    <tr key={index}>
                    <td className="p-2 border">{item.description}</td>
                    <td className="text-right p-2 border">{item.quantity.toFixed(2)}</td>
                    <td className="text-right p-2 border">{item.unitPrice.toFixed(2)} DH</td>
                    <td className="text-right p-2 border">
                        Opérations de production et de distribution
                    </td>
                    <td className="text-right p-2 border">
                        {(item.quantity * item.unitPrice).toFixed(2)} DH
                    </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan="4" className="text-right p-2 border font-semibold">
                    Montant hors taxes
                    </td>
                    <td className="text-right p-2 border font-semibold">
                    {subtotal.toFixed(2)} DH
                    </td>
                </tr>
                <tr>
                    <td colSpan="4" className="text-right p-2 border font-semibold">
                    TVA {invoiceData.taxRate}%
                    </td>
                    <td className="text-right p-2 border font-semibold">
                    {taxAmount.toFixed(2)} DH
                    </td>
                </tr>
                <tr>
                    <td colSpan="4" className="text-right p-2 border font-semibold">
                    Total
                    </td>
                    <td className="text-right p-2 border font-semibold">
                    {total.toFixed(2)} DH
                    </td>
                </tr>
                </tfoot>
            </table>

            {/* Montant en toutes lettres */}
            <p className="text-right font-semibold">
                Montant total en toutes lettres : {numberToWords(total)}
            </p>

            {/* Note */}
            <div className="mt-5">
                <p>
                <strong>Note :</strong> {invoiceData.note}
                </p>
                <div className="mt-5 text-center border-t pt-2">
                <p>{docStyle.footer}</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
