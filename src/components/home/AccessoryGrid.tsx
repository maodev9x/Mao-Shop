import { accessoryTiles } from '../../data/site';
import DeviceImage from '../product/DeviceImage';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import SectionTitle from './SectionTitle';

export default function AccessoryGrid() {
  return (
    <Reveal as="section" className="container-page mt-10">
      <span id="accessory" className="block scroll-mt-24" />
      <SectionTitle title="Sắm thêm phụ kiện chất lượng" />
      <RevealGroup className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6" stagger={0.04}>
        {accessoryTiles.map((t) => (
          <RevealItem key={t.name}>
            <a
              href="#accessory"
              className="group flex items-center gap-2 rounded-xl bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift max-sm:flex-col max-sm:text-center"
            >
              <span className="flex aspect-square w-12 shrink-0 items-center justify-center rounded-lg bg-page transition-colors group-hover:bg-primary-soft">
                <DeviceImage kind={t.kind} color={t.color} className="h-full w-full transition-transform duration-300 group-hover:scale-110" />
              </span>
              <span className="text-xs font-semibold sm:text-sm">{t.name}</span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </Reveal>
  );
}
