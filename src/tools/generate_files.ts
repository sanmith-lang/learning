import fs from "fs";
import PDFDocument from "pdfkit";
import { createObjectCsvWriter } from "csv-writer";

export const generateTextFileTool = {
    name: "generate_text_file",
    description: "Generates a text file from the provided content.",
    execute: async (content: string) => {
        return generateTextFile(content);
    }
}

export const generateJSONFileTool = {
    name: "generate_json_file",
    description: "Generates a JSON file from the provided content.",
    execute: async (content: string) => {
        return generateJSONFile(content);
    }
}

export const generateCSVFileTool = {
    name: "generate_csv_file",
    description: "Generates a CSV file from the provided content.",
    execute: async (content: string) => {
        return generateCSVFile(content);
    }
}

export const generateTextFile = (content: string) => {
    try {

        const filePath = "output.txt";
        fs.writeFileSync(filePath, content);

        return filePath;
    } catch (error) {
        return `Error generating file: ${error}`;
    }
}

export const generateJSONFile = (content: string) => {
    try {
        const filePath = "output.json";
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        return filePath;
    } catch (error) {
        return `Error generating file: ${error}`;
    }
}

export const generateCSVFile = async (content: string) => {
    try {

        const data = JSON.parse(content);

        const csvWriter = createObjectCsvWriter({
            path: "output.csv",
            header: Object.keys(data[0]).map(key => ({ id: key, title: key }))
        });

        await csvWriter.writeRecords(data);

        return "output.csv";

    } catch (error) {
        return `Error generating file: ${error}`;
    }
}
export const generatePdfFile = async (content: string) => {
    try {

        const doc = new PDFDocument();
        const filePath = "output.pdf";

        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(12).text(content);

        doc.end();

        doc.on("finish", () => {
            return filePath;
        });

    } catch (error) {
        return `Error generating file: ${error}`;
    }
}