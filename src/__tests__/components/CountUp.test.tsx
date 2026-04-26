import { render, screen } from "@testing-library/react";
import CountUp from "@/components/CountUp";

// framer-motion n'a pas de DOM réel en jsdom.
// On mocke useInView pour contrôler manuellement quand l'animation est déclenchée.
jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  useInView: jest.fn(),
}));

import { useInView } from "framer-motion";

const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;

describe("CountUp", () => {
  beforeEach(() => {
    // Mocke rAF sans appeler le callback : évite la boucle infinie de l'animation.
    // L'animation est testée séparément via les fakeTimers.
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(jest.fn(() => 0));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("affiche 0 par défaut avant que le composant soit visible", () => {
    mockUseInView.mockReturnValue(false);

    render(<CountUp end={500} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("affiche le préfixe et le suffixe passés en props", () => {
    mockUseInView.mockReturnValue(false);

    render(<CountUp end={100} prefix="€" suffix=" HT" />);

    expect(screen.getByText("€0 HT")).toBeInTheDocument();
  });

  it("applique la className reçue en props", () => {
    mockUseInView.mockReturnValue(false);

    render(<CountUp end={10} className="text-4xl font-bold" />);

    expect(screen.getByText("0")).toHaveClass("text-4xl", "font-bold");
  });

  it("appelle requestAnimationFrame quand le composant entre dans la vue", () => {
    mockUseInView.mockReturnValue(true);

    render(<CountUp end={100} duration={1000} />);

    // Vérifie que l'animation est bien démarrée (rAF appelé par le useEffect)
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it("ne déclenche pas l'animation si déjà animé (once: true)", () => {
    mockUseInView.mockReturnValue(true);

    const { rerender } = render(<CountUp end={100} />);

    const firstCallCount = (window.requestAnimationFrame as jest.Mock).mock.calls.length;

    // Deuxième rendu : hasAnimated.current est true, ne doit pas redéclencher
    rerender(<CountUp end={200} />);

    expect((window.requestAnimationFrame as jest.Mock).mock.calls.length).toBe(firstCallCount);
  });
});
