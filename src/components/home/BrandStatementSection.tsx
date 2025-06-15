
import DoveIcon from "@/components/brand/DoveIcon";
import BrandedButton from "@/components/brand/BrandedButton";

const BrandStatementSection = () => (
  <section className="text-center py-16 px-4 md:px-6 w-screen">
    <div className="max-w-4xl mx-auto space-y-6">
      <DoveIcon size="xl" animate className="mx-auto" />
      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
        Spreading the Gospel through digital media, connecting believers worldwide in faith, worship, and spiritual growth.
      </p>
      <div className="flex justify-center gap-4">
        <BrandedButton variant="primary" showIcon>
          Start Your Journey
        </BrandedButton>
        <BrandedButton variant="outline">
          Learn More
        </BrandedButton>
      </div>
    </div>
  </section>
);

export default BrandStatementSection;
