import SectionHeading from "../../common/SectionHeading";
import ProductCard from "./ProductCard";
import productDocsim from "../../../assets/product-docsim.png";
import productDocpilot from "../../../assets/product-docpilot.png";
import productDoxtract from "../../../assets/product-doxtract.png";

const products = [
  {
    badge: "DocSim",
    badgeColor: "brown" as const,
    title: "AI-Powered Document Similarity Engine",
    features: [
      "Detects near-duplicates and tampered documents.",
      "Identifies fraudulent patterns across large repositories.",
      "Multi-language support for global adaptability.",
    ],
    benefits: [
      "Save 30% time on manual checks.",
      "Reduce document fraud by up to 40%.",
    ],
    image: productDocsim,
    imageAlt: "DocSim AI Document Similarity Engine",
  },
  {
    badge: "DocPilot",
    badgeColor: "orange" as const,
    title: "Streamline Document Workflows with Automation",
    features: [
      "Automates document collection, routing, and task assignments.",
      "Real-time tracking with advanced dashboards.",
      "Seamless integration with enterprise systems via APIs.",
    ],
    benefits: [
      "Reduce turnaround times by 50%.",
      "Improve operational efficiency with minimal manual effort.",
    ],
    image: productDocpilot,
    imageAlt: "DocPilot Document Workflow Automation",
  },
  {
    badge: "Doxtract",
    badgeColor: "orange" as const,
    title: "Extract, Validate, and Process Documents with Ease",
    features: [
      "OCR and NLP-based data extraction.",
      "Handles unstructured documents across industries.",
      "Validates fields using external data sources.",
    ],
    benefits: [
      "Process 10,000+ documents in minutes.",
      "Achieve 99% data accuracy with AI-driven validation.",
    ],
    image: productDoxtract,
    imageAlt: "Doxtract AI Document Extraction",
  },
];

const ProductsSection = () => {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <SectionHeading
          tagline="features and benefits."
          heading="Our Products"
          centered
          className="mb-8 sm:mb-12 md:mb-16"
        />

        {products.map((product, index) => (
          <ProductCard
            key={product.badge}
            {...product}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
